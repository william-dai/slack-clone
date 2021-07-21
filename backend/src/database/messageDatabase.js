const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.getMessages = async () => {
  let select = 'SELECT * FROM message';
  let query = {
    text: select,
    values: [],
  };
  const {rows} = await pool.query(query);
  return rows;
};

exports.createMessage = async (givenContent, givenChannel, givenUser) => {
  let select = `INSERT INTO message (createdby, createdtime, content, replies, reactions) SELECT name, current_timestamp, $1, '{"Replies": "Okay, here we go..."}', 'Laugh' FROM users WHERE LOWER(name) = LOWER($2);`
  let query = {
    text: select,
    values: [givenContent, givenUser]
  };
  const message = await pool.query(query);
  return message;
};