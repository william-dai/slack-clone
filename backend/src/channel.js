const db = require('./database/channelDatabase.js');

exports.getChannels = async(req, res) => {
  const messages = await db.getChannels();
  if (messages.length !== 0) {
    res.status(200).json(messages);
  } else {
    res.status(404).send();
  }
};

exports.createChannel = async(req, res) => {
  const name = req.query.channel;
  const workspace = req.query.workspace;
  const created = await db.createChannel(name, workspace);
  console.log(created);
  if (created.rowCount !== 0) {
    res.status(200).json(created);
  } else {
    res.status(400).send();
  }
};