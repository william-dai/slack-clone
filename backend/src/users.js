const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

 exports.getTest = async () => {
  const select = 'SELECT * FROM users';
  const query = {
    text: select,
    values: [],
  };
  const {rows} = await pool.query(query);
  // return rows[0].created;
  console.log(rows);
};