-- Dummy Data --
INSERT INTO dummy (created) VALUES (current_timestamp);

-- Populate Your Tables Here --

-- Creating Users --
INSERT INTO users (name, email, pass, role, workspace, status) VALUES ('Michael', 'miajuare@ucsc.edu', '$2b$12$dsraloj1YhdxZU3JHyvVneCFZDIV9e46LTQp3md0ILbBo1hKifwPG', 'Student', 'CSE183', 'online');
INSERT INTO users (name, email, pass, role, workspace, status) VALUES ('William', 'widai@ucsc.edu', '$2b$12$66ZACwLcoRphmEGL0./oGuYP.e9uoGEW9B.lN4LxDiry6hYRh6iqq', 'Student', 'CSE183', 'away');
INSERT INTO users (name, email, pass, role, workspace, status) VALUES ('James', 'james@ucsc.edu', '$2b$12$uym9JpuKKJmuv.AP8OtOJ.kT3Y0PdBF4uaIGjrOiM4LIt0GYMzo0.', 'Student', 'CSE183', 'online');
INSERT INTO users (name, email, pass, role, workspace, status) VALUES ('Bella', 'bella@ucsc.edu', '$2b$12$uym9JpuKKJmuv.AP8OtOJ.kT3Y0PdBF4uaIGjrOiM4LIt0GYMzo0.', 'Student', 'CSE183', 'online');

-- Creating Workspaces --
INSERT INTO workspace (name, users) VALUES ('CSE183', ARRAY ['Michael', 'Nathan']);

-- Creating Channels --
INSERT INTO channel (workspaceid, category, name, users) SELECT id, 'Channels', 'General', ARRAY ['Michael', 'Nathan'] FROM workspace;
INSERT INTO channel (workspaceid, category, name, users) SELECT id, 'Channels', 'assignment-1', ARRAY ['Michael', 'Nathan'] FROM workspace;
INSERT INTO channel (workspaceid, category, name, users) SELECT id, 'Channels', 'assignment-2', ARRAY ['Michael', 'Nathan'] FROM workspace;
INSERT INTO channel (workspaceid, category, name, users) SELECT id, 'Channels', 'assignment-3', ARRAY ['Michael', 'Nathan'] FROM workspace;
INSERT INTO channel (workspaceid, category, name, users) SELECT id, 'Channels', 'assignment-4', ARRAY ['Michael', 'Nathan'] FROM workspace;
INSERT INTO channel (workspaceid, category, name, users) SELECT id, 'DMs', 'Nathan', ARRAY ['Michael', 'Nathan'] FROM workspace;
INSERT INTO channel (workspaceid, category, name, users) SELECT id, 'DMs', 'William', ARRAY ['Michael', 'William'] FROM workspace;
INSERT INTO channel (workspaceid, category, name, users) SELECT id, 'DMs', 'James', ARRAY ['Michael', 'James'] FROM workspace;
INSERT INTO channel (workspaceid, category, name, users) SELECT id, 'DMs', 'Bella', ARRAY ['Michael', 'Bella'] FROM workspace;

-- Creating Starting Messages --
INSERT INTO message (channelid, createdby, createdtime, content, replies, reactions) SELECT id, 'Bella', current_timestamp, 'Testing, One, Two, Three.', '{"Replies": "Okay, here we go..."}', 'Laugh' FROM channel WHERE name = 'General';
INSERT INTO message (channelid, createdby, createdtime, content, replies, reactions) SELECT id, 'Bella', current_timestamp, 'Testing, One, Two, Three.', '{"Replies": "Okay, here we go..."}', 'Laugh' FROM channel WHERE name = 'General';
INSERT INTO message (channelid, createdby, createdtime, content, replies, reactions) SELECT id, 'Bella', current_timestamp, 'Testing, One, Two, Three.', '{"Replies": "Okay, here we go..."}', 'Laugh' FROM channel WHERE name = 'General';