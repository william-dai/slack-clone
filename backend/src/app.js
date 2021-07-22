const express = require('express');
const cors = require('cors');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const OpenApiValidator = require('express-openapi-validator');

const auth = require('./auth');
const dummy = require('./dummy');
const users = require('./users.js');
const workspace = require('./workspace.js');
const channel = require('./channel.js');
const message = require('./message.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const apiSpec = path.join(__dirname, '../api/openapi.yaml');

const apidoc = yaml.load(fs.readFileSync(apiSpec, 'utf8'));
app.use('/v0/api-docs', swaggerUi.serve, swaggerUi.setup(apidoc));

app.post('/v0/authenticate', auth.authenticate);

app.use(
    OpenApiValidator.middleware({
      apiSpec: apiSpec,
      validateRequests: true,
      validateResponses: true,
    }),
);

app.get('/v0/dummy', dummy.get);
// Your routes go here
app.get('/v0/users/', auth.check, users.getUsers);
app.get('/v0/workspace/', auth.check, workspace.getWorkspace);
app.get('/v0/channel/', auth.check, channel.getChannels);
app.get('/v0/message', auth.check, message.getMessages);
app.post('/v0/message', auth.check, message.createMessage);
app.get('/v0/message/:id', auth.check, message.getMessagesByChannel);
app.get('/v0/reply', auth.check, message.getReplies);
app.post('/v0/reply', auth.check, message.createReply);
app.get('/v0/reply/:id', auth.check, message.getRepliesById);

app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

module.exports = app;
