const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bexultandb', 
  password: '1234', 
  port: 5433, 
});

const JWT_SECRET = 'your_super_secret_key_2026';

app.post('/api/login', async (req, res) => {
  const { identifier, password } = req.body;
  try {
    const userResult = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR phone = $1', 
      [identifier]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "Пайдаланушы табылмады" });
    }

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    
    if (!isMatch) {
      return res.status(401).json({ error: "Қате пароль" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );

    res.json({
      message: "Кіру сәтті өтті",
      token,
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name, 
        role: user.role 
      }
    });

  } catch (err) {
    res.status(500).json({ error: "Серверде қате болды" });
  }
});

app.post('/api/register', async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await pool.query(
      'INSERT INTO users (name, email, phone, password_hash) VALUES ($1, $2, $3, $4) RETURNING id, name, email',
      [name, email, phone, hashedPassword]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Тіркелу мүмкін болмады." });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Сервер қатесі" });
  }
});

app.post('/api/products', async (req, res) => {
  const { name, price, description, image_url, category, gender } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO products (name, price, description, image_url, category, gender) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, price, description, image_url, category, gender]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Дерек сақтау мүмкін болмады" });
  }
});

app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, description, image_url, category, gender } = req.body;
  try {
    await pool.query(
      'UPDATE products SET name = $1, price = $2, description = $3, image_url = $4, category = $5, gender = $6 WHERE id = $7', 
      [name, price, description, image_url, category, gender, id]
    );
    res.json({ message: "Тауар жаңартылды" });
  } catch (err) {
    res.status(500).json({ error: "Жаңарту кезінде қате шықты" });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.json({ message: "Тауар өшірілді" });
  } catch (err) {
    res.status(500).json({ error: "Өшіру кезінде қате шықты" });
  }
});
app.post('/api/orders', async (req, res) => {
    try {
        const { name, email, phone, method, address, date, time, total, cardNumber } = req.body;
        
        const newOrder = await pool.query(
            `INSERT INTO orders (user_name, user_email, user_phone, delivery_method, address, delivery_date, delivery_time, total_amount, card_number) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [name, email, phone, method, address, date, time, total, cardNumber]
        );

        res.status(201).json({ message: "Тапсырыс сәтті қабылданды!", order: newOrder.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Серверде қате кетті");
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Сервер: http://localhost:${PORT}`));