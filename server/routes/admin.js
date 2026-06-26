import bcrypt from 'bcryptjs';
import { getDb, saveDb } from '../db.js';
import { generateToken, authMiddleware } from '../middleware/auth.js';

export async function adminRoutes(app) {
  app.post('/api/admin/verify', async (request, reply) => {
    const { pin } = request.body;
    if (!pin) {
      return reply.status(400).send({ error: 'PIN is required' });
    }
    const db = getDb();
    const results = db.exec(`SELECT pin_hash FROM admin_config WHERE id = 1`);
    if (results.length === 0) {
      return reply.status(500).send({ error: 'Admin config not found' });
    }
    const pinHash = results[0].values[0][0];
    const isValid = bcrypt.compareSync(pin, pinHash);
    if (!isValid) {
      return reply.status(401).send({ error: 'Invalid PIN' });
    }
    const token = generateToken();
    return { success: true, token };
  });

  app.put('/api/admin/change-pin', { preHandler: authMiddleware }, async (request, reply) => {
    const { currentPin, newPin } = request.body;
    if (!currentPin || !newPin) {
      return reply.status(400).send({ error: 'Current PIN and new PIN are required' });
    }
    if (!/^\d{4}$/.test(newPin)) {
      return reply.status(400).send({ error: 'New PIN must be exactly 4 digits' });
    }
    const db = getDb();
    const results = db.exec(`SELECT pin_hash FROM admin_config WHERE id = 1`);
    const pinHash = results[0].values[0][0];
    const isValid = bcrypt.compareSync(currentPin, pinHash);
    if (!isValid) {
      return reply.status(401).send({ error: 'Current PIN is incorrect' });
    }
    const newHash = bcrypt.hashSync(newPin, 10);
    db.run(`UPDATE admin_config SET pin_hash = ?, updated_at = datetime('now') WHERE id = 1`, [newHash]);
    saveDb();
    return { success: true, message: 'PIN changed successfully' };
  });
}
