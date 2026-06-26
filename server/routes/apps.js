import { getDb, saveDb } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

export async function appRoutes(app) {
  app.get('/api/apps', async (request, reply) => {
    const db = getDb();
    const results = db.exec(`SELECT * FROM apps ORDER BY name ASC`);
    if (results.length === 0) return [];
    const columns = results[0].columns;
    const apps = results[0].values.map(row => {
      const obj = {};
      columns.forEach((col, i) => { obj[col] = row[i]; });
      return obj;
    });
    return apps;
  });

  app.post('/api/apps', { preHandler: authMiddleware }, async (request, reply) => {
    const { name, category, description, desc, url, keywords, icon, logo } = request.body;
    if (!name || !url) {
      return reply.status(400).send({ error: 'Name and URL are required' });
    }
    const db = getDb();
    db.run(
      `INSERT INTO apps (name, category, description, url, keywords, icon, logo) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, category || 'General', description || desc || '', url, keywords || '', icon || '', logo || '']
    );
    saveDb();
    const id = db.exec(`SELECT last_insert_rowid() as id`)[0].values[0][0];
    const app = db.exec(`SELECT * FROM apps WHERE id = ${id}`)[0];
    const columns = app.columns;
    const obj = {};
    columns.forEach((col, i) => { obj[col] = app.values[0][i]; });
    return obj;
  });

  app.put('/api/apps/:id', { preHandler: authMiddleware }, async (request, reply) => {
    const { id } = request.params;
    const { name, category, description, desc, url, keywords, icon, logo } = request.body;
    const db = getDb();
    const existing = db.exec(`SELECT id FROM apps WHERE id = ${id}`);
    if (existing.length === 0) {
      return reply.status(404).send({ error: 'App not found' });
    }
    const updates = [];
    const values = [];
    if (name !== undefined) { updates.push('name = ?'); values.push(name); }
    if (category !== undefined) { updates.push('category = ?'); values.push(category); }
    if (description !== undefined) { updates.push('description = ?'); values.push(description); }
    else if (desc !== undefined) { updates.push('description = ?'); values.push(desc); }
    if (url !== undefined) { updates.push('url = ?'); values.push(url); }
    if (keywords !== undefined) { updates.push('keywords = ?'); values.push(keywords); }
    if (icon !== undefined) { updates.push('icon = ?'); values.push(icon); }
    if (logo !== undefined) { updates.push('logo = ?'); values.push(logo); }
    updates.push("updated_at = datetime('now')");
    db.run(`UPDATE apps SET ${updates.join(', ')} WHERE id = ?`, [...values, id]);
    saveDb();
    const app = db.exec(`SELECT * FROM apps WHERE id = ${id}`)[0];
    const columns = app.columns;
    const obj = {};
    columns.forEach((col, i) => { obj[col] = app.values[0][i]; });
    return obj;
  });

  app.delete('/api/apps/:id', { preHandler: authMiddleware }, async (request, reply) => {
    const { id } = request.params;
    const db = getDb();
    const existing = db.exec(`SELECT id FROM apps WHERE id = ${id}`);
    if (existing.length === 0) {
      return reply.status(404).send({ error: 'App not found' });
    }
    db.run(`DELETE FROM launch_history WHERE app_id = ${id}`);
    db.run(`DELETE FROM favorites WHERE app_id = ${id}`);
    db.run(`DELETE FROM apps WHERE id = ${id}`);
    saveDb();
    return { success: true };
  });

  app.get('/api/apps/recent', async (request, reply) => {
    const browserId = request.headers['x-browser-id'];
    if (!browserId) return [];
    const db = getDb();
    const results = db.exec(`
      SELECT DISTINCT a.* FROM apps a
      INNER JOIN launch_history lh ON a.id = lh.app_id
      WHERE lh.browser_id = '${browserId.replace(/'/g, "''")}'
      ORDER BY lh.launched_at DESC
      LIMIT 10
    `);
    if (results.length === 0) return [];
    const columns = results[0].columns;
    return results[0].values.map(row => {
      const obj = {};
      columns.forEach((col, i) => { obj[col] = row[i]; });
      return obj;
    });
  });

  app.post('/api/apps/launch/:id', async (request, reply) => {
    const { id } = request.params;
    const browserId = request.headers['x-browser-id'] || 'unknown';
    const db = getDb();
    const existing = db.exec(`SELECT id FROM apps WHERE id = ${id}`);
    if (existing.length === 0) {
      return reply.status(404).send({ error: 'App not found' });
    }
    db.run(
      `INSERT INTO launch_history (app_id, browser_id) VALUES (?, ?)`,
      [id, browserId]
    );
    saveDb();
    return { success: true };
  });

  app.get('/api/favorites', async (request, reply) => {
    const browserId = request.headers['x-browser-id'];
    if (!browserId) return [];
    const db = getDb();
    const results = db.exec(
      `SELECT app_id FROM favorites WHERE browser_id = ?`,
      [browserId]
    );
    if (results.length === 0) return [];
    const columns = results[0].columns;
    return results[0].values.map(row => {
      const obj = {};
      columns.forEach((col, i) => { obj[col] = row[i]; });
      return obj;
    });
  });

  app.post('/api/favorites/:id', async (request, reply) => {
    const { id } = request.params;
    const browserId = request.headers['x-browser-id'];
    if (!browserId) return reply.status(400).send({ error: 'Browser ID required' });
    const db = getDb();
    db.run(
      `INSERT OR IGNORE INTO favorites (app_id, browser_id) VALUES (?, ?)`,
      [id, browserId]
    );
    saveDb();
    return { success: true };
  });

  app.delete('/api/favorites/:id', async (request, reply) => {
    const { id } = request.params;
    const browserId = request.headers['x-browser-id'];
    if (!browserId) return reply.status(400).send({ error: 'Browser ID required' });
    const db = getDb();
    db.run(
      `DELETE FROM favorites WHERE app_id = ? AND browser_id = ?`,
      [id, browserId]
    );
    saveDb();
    return { success: true };
  });

  app.get('/api/category-icons', async (request, reply) => {
    const db = getDb();
    const results = db.exec(`SELECT category, icon FROM category_icons`);
    if (results.length === 0) return {};
    const obj = {};
    results[0].values.forEach(row => {
      obj[row[0]] = row[1];
    });
    return obj;
  });

  app.put('/api/category-icons/:category', { preHandler: authMiddleware }, async (request, reply) => {
    const { category } = request.params;
    const { icon } = request.body;
    if (!icon) return reply.status(400).send({ error: 'Icon is required' });
    const db = getDb();
    const existing = db.exec(`SELECT id FROM category_icons WHERE category = ?`, [category]);
    if (existing.length > 0) {
      db.run(`UPDATE category_icons SET icon = ? WHERE category = ?`, [icon, category]);
    } else {
      db.run(`INSERT INTO category_icons (category, icon) VALUES (?, ?)`, [category, icon]);
    }
    saveDb();
    return { success: true };
  });
}
