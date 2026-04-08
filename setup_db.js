import pkg from 'pg';
const { Pool } = pkg;

const DATABASE_URL = 'postgresql://beksh:yJhCCBgOTrSM5PxWs0gcI9N3mHwfQBs1@dpg-d799161r0fns73ecpoi0-a.frankfurt-postgres.render.com/bexultandb'; // <--- ОСЫНЫ ӨЗГЕРТІҢІЗ

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function setupDatabase() {
  try {
    console.log("Дерекқормен (Render) байланыс орнатылуда...");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE,
        phone VARCHAR(255) UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user'
      );

      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price INTEGER NOT NULL,
        description TEXT,
        image_url VARCHAR(255),
        category VARCHAR(100),
        gender VARCHAR(50)
      );

      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_name VARCHAR(255),
        user_email VARCHAR(255),
        user_phone VARCHAR(255),
        delivery_method VARCHAR(50),
        address TEXT,
        delivery_date VARCHAR(50),
        delivery_time VARCHAR(50),
        total_amount INTEGER,
        card_number VARCHAR(255),
        status VARCHAR(50) DEFAULT 'paid',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Барлық кестелер (users, products, orders) сәтті жасалды!");

    s

  } catch (error) {
    console.error("❌ Қате шықты:", error);
  } finally {
    pool.end();
  }
}

setupDatabase();
