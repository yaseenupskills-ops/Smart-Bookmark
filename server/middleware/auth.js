import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'smart-bookmark-hub-secret-key-change-in-prod';

export function generateToken() {
  return jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export async function authMiddleware(request, reply) {
  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return reply.status(401).send({ error: 'Unauthorized: No token provided' });
  }
  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  if (!decoded) {
    return reply.status(401).send({ error: 'Unauthorized: Invalid or expired token' });
  }
}
