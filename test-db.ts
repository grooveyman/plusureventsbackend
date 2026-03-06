// test-db.ts (create in project root)
import * as dotenv from 'dotenv';
dotenv.config();

import { Client } from 'pg';

const client = new Client({
  host: process.env.SDB_HOST,
  port: Number(process.env.SDB_PORT) || 5432,
  user: process.env.SDB_USER,
  password: process.env.SDB_PASSWORD,
  database: process.env.SDB_NAME,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 5000,
});

async function test() {
  console.log('Connecting to:', process.env.SDB_HOST);
  try {
    await client.connect();
    const res = await client.query('SELECT version()');
    console.log('✅ Connected!', res.rows[0]);
    await client.end();
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
  }
}

test();