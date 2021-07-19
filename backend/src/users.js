const db = require('./database/userDatabase.js');

exports.getUsers = async(req, res) => {
    const users = await db.getUsers(req.query.username);
    if (users.length !== 0) {
        console.log(users[0].workspace);
        res.status(200).json(users);
    } else {
        res.status(404).send();
    }
};