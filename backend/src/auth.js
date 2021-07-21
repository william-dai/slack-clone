const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {Pool} = require('pg');

const secrets = require('./database/secrets.json');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.authenticate = async (req, res) => {
  const {email, pass} = req.body;
  const query = {
    text: `SELECT * FROM users WHERE LOWER(email) = LOWER($1)`,
    values: [email],
  };
  const {rows} = await pool.query(query);
  console.log(query);
  if (rows.length !== 0) {
    // if (rows[0].email === email && rows[0].pass === pass) {
    if (rows[0].email === email && bcrypt.compareSync(pass, rows[0].pass)) {
      // res.status(200).json({email: rows[0].email, pass: rows[0].pass});
      const accessToken = jwt.sign(
          {email: rows[0].email, pass: rows[0].pass},
          secrets.accessToken, {
            expiresIn: '30m',
            algorithm: 'HS256',
          });
      res.status(200).json({name: rows[0].email, accessToken: accessToken});
      // res.status(200).json({name: rows[0].email, pass: rows[0].pass});
    }
  }
  res.status(401).send('Failed to authenticate user.');
};

exports.check = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secrets.accessToken, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
