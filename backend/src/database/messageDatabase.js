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

exports.getMessagesByChannel = async (givenChannelId) => {
  let select = 'SELECT * FROM message WHERE channelid = $1';
  let query = {
    text: select,
    values: [givenChannelId],
  };
  const {rows} = await pool.query(query);
  console.log(rows);
  return rows.length !== 0 ? rows : undefined;
};

exports.createMessage = async (givenContent, givenChannel, givenUser) => {
  let select = `INSERT INTO message (channelid, createdby, createdtime, content, reactions) VALUES ($1, $2, current_timestamp, $3, 'Laugh')`;
  let query = {
    text: select,
    values: [givenChannel, givenUser, givenContent],
  };
  const message = await pool.query(query);
  return message;
};

exports.getReplies = async () => {
  let select = 'SELECT * FROM reply';
  let query = {
    text: select,
    values: [],
  };
  const {rows} = await pool.query(query);
  return rows;
};

exports.addReply = async (givenContent, givenMessage, givenUser) => {
  let select = `INSERT INTO reply (messageid, createdby, createdtime, content, reactions) VALUES ($1, $2, current_timestamp, $3, 'Laugh')`;
  let query = {
    text: select,
    values: [givenMessage, givenUser, givenContent],
  }
  const reply = await pool.query(query);
  return reply;
};
