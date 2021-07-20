const db = require('./database/messageDatabase.js');

exports.getMessages = async(req, res) => {
  const messages = await db.getMessages();
  if (messages.length !== 0) {
    res.status(200).json(messages);
  } else {
    res.status(404).send();
  }
};