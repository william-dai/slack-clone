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

exports.createChannel = async (name, workspace) => {
  const select = `INSERT INTO channel (workspaceid, name, users) SELECT id, $1, ARRAY ['Michael', 'Nathan'] FROM workspace WHERE id = $2`;
  const query = {
    text: select,
    values: [name, workspace],
  };
  const channel = await pool.query(query);
  return channel;
};

exports.getChannelById = async (id) => {
  let select = 'SELECT * FROM channel WHERE id = $1';
  let query = {
    text: select,
    values: [id],
  };
  const {rows} = await pool.query(query);
  return rows.length !== 0 ? rows : undefined;
};
