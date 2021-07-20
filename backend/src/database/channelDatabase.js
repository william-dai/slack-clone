const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.getChannels = async () => {
  let select = 'SELECT * FROM channel';
  let query = {
    text: select,
    values: [],
  };
  const {rows} = await pool.query(query);
  return rows;
};