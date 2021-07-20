/* const jwt = require('jsonwebtoken'); */
var bcrypt = require('bcrypt');

const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.authenticate = async (req, res) => {
  const {email, password} = req.body;

  const query = {
    text: `SELECT * FROM users WHERE LOWER(username) = $1 AND pass = $2`,
    values: [email, password],
  }
  const {rows} = await pool.query(query);
  if (rows[0].email === email && bcrypt.compareSync(password, rows[0].pass)) {
    res.status(200).json({name: rows[0].name});
  } else {
    res.status(401).send('Failed to authenticate user.');
  }
}

