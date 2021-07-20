const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.getWorkspace = async (givenName) => {
  let select = 'SELECT * FROM workspace';
  let query = {
    text: select,
    values: [],
  };
  if (givenName) {
    select += ' WHERE LOWER(name) = LOWER($1)';
    query = {
      text: select,
      values: [givenName],
    };
  }
  const {rows} = await pool.query(query);
  return rows;
};

exports.createWorkspace = async (givenName, givenGroup) => {
  let select = `INSERT INTO workspace (name, users) VALUES ($1, $2)`;
  let query = {
    text: select,
    values: [givenName, [givenGroup]]
  };
  const workspace = await pool.query(query);
  return workspace;
};