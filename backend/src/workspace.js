const db = require('./database/workspaceDatabase.js');

exports.getWorkspace = async(req, res) => {
  const workspace = await db.getWorkspace(req.query.workspace);
  if (workspace.length !== 0) {
    res.status(200).json(workspace);
  } else {
    res.status(404).send();
  }
};