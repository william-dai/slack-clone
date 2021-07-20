const db = require('./database/channelDatabase.js');

exports.getChannels = async(req, res) => {
  const messages = await db.getChannels();
  if (messages.length !== 0) {
    res.status(200).json(messages);
  } else {
    res.status(404).send();
  }
};