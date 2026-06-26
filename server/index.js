import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDb } from './db.js';
import { appRoutes } from './routes/apps.js';
import { adminRoutes } from './routes/admin.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';

async function start() {
  await initDb();

  const server = Fastify({ logger: true });

  await server.register(cors, {
    origin: true,
    credentials: true,
  });

  if (isProduction) {
    await server.register(fastifyStatic, {
      root: path.join(__dirname, '..', 'dist'),
      prefix: '/',
    });
  }

  await server.register(appRoutes);
  await server.register(adminRoutes);

  if (isProduction) {
    server.setNotFoundHandler((request, reply) => {
      if (!request.url.startsWith('/api')) {
        return reply.sendFile('index.html');
      }
      return reply.status(404).send({ error: 'Not found' });
    });
  }

  try {
    await server.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();
