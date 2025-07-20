const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'http://webtierlb-1303649568.ap-south-1.elb.amazonaws.com',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}))

app.use(express.json());


// Optional: Log all requests to debug
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
// ✅ Hardcoded DB connection
const db = mysql.createConnection({
  host: 'projectdb.c38gwa8im07y.ap-south-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Admin12345',
  database: 'studentdb',
});

// ✅ Connect to DB
db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to MySQL database');
});

// ✅ Routes
app.get('/', (req, res) => {
  res.send("Student App is running!");
});

app.post('/add-student', (req, res) => {
  const { name, age } = req.body;
  db.query('INSERT INTO students (name, age) VALUES (?, ?)', [name, age], (err) => {
    if (err) return res.status(500).send(err.message);
    res.send('Student added successfully');
  });
});

app.get('/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.json(results);
  });
});

// ✅ Start server
app.listen(5000, '0.0.0.0', () => {
  console.log("Server is running on 0.0.0.0:5000");
});