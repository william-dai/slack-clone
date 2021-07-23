const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

getDMMessages = async (id) => {
  let select = 'SELECT * FROM message WHERE channelid = $1';
  let query = {
    text: select,
    values: [id],
  };
  const {rows} = await pool.query(query);
  if (rows.length === 0) {
    return undefined;
  }
  return rows.length !== 0 ? rows[0] : undefined;
}

exports.getMessages = async (dms) => {
  let select = 'SELECT * FROM message';
  if (dms) {
    select = `SELECT * FROM channel WHERE category = 'DMs'`;
  }
  let query = {
    text: select,
    values: [],
  };
  let {rows} = await pool.query(query);
  if (dms) {
    let temp = [];
    for (const i in rows) {
      if (rows[i].id) {
        const test = await getDMMessages(rows[i].id);
        if (test === undefined) {
          continue;
        }
        temp.push(await getDMMessages(rows[i].id));
      }
    }
    rows = temp;
  }
  return rows;
};

getMessageById = async (givenId, bool) => {
  let select = 'SELECT * FROM message WHERE id = $1';
  let query = {
    text: select,
    values: [givenId],
  };
  let {rows} = await pool.query(query);
  if (bool) {
    rows = await getChannelwithReply(rows[0].channelid);
  }
  return rows.length !== 0 ? rows : undefined;
}

getChannelwithReply = async (id) => {
  let select = 'SELECT * FROM channel WHERE id = $1';
  let query = {
    text: select,
    values: [id],
  };
  const {rows} = await pool.query(query);
  return rows.length !== 0 ? rows : undefined;
};
/*
exports.getDMs = async () => {
  let select = `SELECT * message WHERE category = 'DMs'`;
  let query = {
    text: select,
    values: [],
  };
  let {rows} = await pool.query(query);
  return rows.length !== 0 ? rows : undefined;
};
*/
exports.getMessagesByChannel = async (givenChannelId, bool) => {
  let select = 'SELECT * FROM message WHERE channelid = $1';
  let query = {
    text: select,
    values: [givenChannelId],
  };
  let {rows} = await pool.query(query);
  if (rows.length === 0) {
    rows = await getMessageById(givenChannelId, bool);
  }
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

exports.getRepliesById = async (givenMessageId) => {
  let select = 'SELECT * FROM reply WHERE messageid = $1';
  let query = {
    text: select,
    values: [givenMessageId],
  };
  let {rows} = await pool.query(query);
  return rows.length !== 0 ? rows : undefined;
};
