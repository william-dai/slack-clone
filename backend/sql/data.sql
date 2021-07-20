-- Dummy Data --
INSERT INTO dummy (created) VALUES (current_timestamp);

-- Populate Your Tables Here --

-- Creating Users --
INSERT INTO users (name, email, pass, workspace, status) VALUES ('Michael', 'miajuare@ucsc.edu', 'abc123', 'CSE183', 'online');
INSERT INTO users (name, email, pass, workspace, status) VALUES ('William', 'widai@ucsc.edu', 'asdf1234', 'CSE183', 'away');
INSERT INTO users (name, email, pass, workspace, status) VALUES ('James', 'james@ucsc.edu', 'password', 'CSE183', 'online');
INSERT INTO users (name, email, pass, workspace, status) VALUES ('Bella', 'bella@ucsc.edu', 'password', 'CSE183', 'online');

-- Creating Workspaces --
INSERT INTO workspace (name, users) VALUES ('CSE183', ARRAY ['Michael', 'Nathan']);

-- Creating Channels --
INSERT INTO channel (workspaceid, name, users) SELECT id, 'General', ARRAY ['Michael', 'Nathan'] FROM workspace;

-- Creating Starting Messages --
INSERT INTO message (createdby, createdtime, content, replies, reactions) SELECT name, current_timestamp, 'Testing, One, Two, Three.', '{"Replies": "Okay, here we go..."}', 'Laugh' FROM users WHERE name = 'Bella';