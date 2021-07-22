-- Dummy Data --
INSERT INTO dummy (created) VALUES (current_timestamp);

-- Populate Your Tables Here --

-- Creating Users --
INSERT INTO users (name, email, pass, roles, workspace, status) VALUES ('Michael', 'miajuare@ucsc.edu', '$2b$12$dsraloj1YhdxZU3JHyvVneCFZDIV9e46LTQp3md0ILbBo1hKifwPG', ARRAY ['CSE183', 'CSE130'], 'CSE183', 'online');
INSERT INTO users (name, email, pass, roles, workspace, status) VALUES ('William', 'widai@ucsc.edu', '$2b$12$66ZACwLcoRphmEGL0./oGuYP.e9uoGEW9B.lN4LxDiry6hYRh6iqq', ARRAY ['CSE183', 'CSE130'], 'CSE183', 'away');
INSERT INTO users (name, email, pass, roles, workspace, status) VALUES ('James', 'james@ucsc.edu', '$2b$12$uym9JpuKKJmuv.AP8OtOJ.kT3Y0PdBF4uaIGjrOiM4LIt0GYMzo0.', ARRAY ['CSE183'], 'CSE183', 'online');
INSERT INTO users (name, email, pass, roles, workspace, status) VALUES ('Bella', 'bella@ucsc.edu', '$2b$12$uym9JpuKKJmuv.AP8OtOJ.kT3Y0PdBF4uaIGjrOiM4LIt0GYMzo0.', ARRAY ['CSE130'], 'CSE130', 'online');

-- Creating Workspaces --
INSERT INTO workspace (name, users) VALUES ('CSE183', ARRAY ['Michael', 'Nathan']);
INSERT INTO workspace (name, users) VALUES ('CSE130', ARRAY ['Michael', 'Nathan']);

-- Creating Channels --
INSERT INTO channel (workspaceid, category, name, users) SELECT id, 'Channels', 'General', ARRAY ['Michael', 'Nathan'] FROM workspace WHERE name = 'CSE183';
INSERT INTO channel (workspaceid, category, name, users) SELECT id, 'Channels', 'assignment-1', ARRAY ['Michael', 'Nathan'] FROM workspace WHERE name = 'CSE183';
INSERT INTO channel (workspaceid, category, name, users) SELECT id, 'Channels', 'assignment-2', ARRAY ['Michael', 'Nathan'] FROM workspace WHERE name = 'CSE183';
INSERT INTO channel (workspaceid, category, name, users) SELECT id, 'Channels', 'assignment-3', ARRAY ['Michael', 'Nathan'] FROM workspace WHERE name = 'CSE183';
INSERT INTO channel (workspaceid, category, name, users) SELECT id, 'Channels', 'assignment-4', ARRAY ['Michael', 'Nathan'] FROM workspace WHERE name = 'CSE183';

INSERT INTO channel (workspaceid, category, name, users) SELECT id, 'Channels', 'General', ARRAY ['Michael', 'Nathan'] FROM workspace WHERE name = 'CSE130';

INSERT INTO channel (workspaceid, category, name, users) VALUES (gen_random_uuid(), 'DMs', 'Nathan', ARRAY ['Michael', 'Nathan']);
INSERT INTO channel (workspaceid, category, name, users) VALUES (gen_random_uuid(), 'DMs', 'William', ARRAY ['Michael', 'William']);
INSERT INTO channel (workspaceid, category, name, users) VALUES (gen_random_uuid(), 'DMs', 'James', ARRAY ['Michael', 'James']);
INSERT INTO channel (workspaceid, category, name, users) VALUES (gen_random_uuid(), 'DMs', 'Bella', ARRAY ['Michael', 'Bella']);

-- Creating Starting Messages --
INSERT INTO message (channelid, createdby, createdtime, content, reactions) SELECT id, 'Bella', current_timestamp, 'Testing, One, Two, Three.', 'Laugh' FROM channel WHERE name = 'General';

-- Creating Starting Replies --
INSERT INTO reply (messageid, createdby, createdtime, content, reactions) SELECT id, 'Michael', current_timestamp, 'This is a reply.', 'Laugh' FROM message WHERE createdby = 'Bella';
