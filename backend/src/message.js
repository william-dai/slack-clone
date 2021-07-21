const db = require('./database/messageDatabase.js');

exports.getMessages = async(req, res) => {
  const messages = await db.getMessages();
  if (messages.length !== 0) {
    res.status(200).json(messages);
  } else {
    res.status(404).send();
  }
};

exports.createMessage = async(req, res) => {
  const message =
  await db.createMessage(req.query.message, req.query.channel, req.query.user);
  if (message.rowCount !== 0) {
    res.status(200).json(message);
  } else {
    res.status(404).send();
  }
};