-- Dummy Data --
INSERT INTO dummy (created) VALUES (current_timestamp);

-- Populate Your Tables Here --
INSERT INTO users (name, email, pass, workspace, status) VALUES ('Michael', 'miajuare@ucsc.edu', 'abc123', 'test', 'online');
INSERT INTO users (name, email, pass, workspace, status) VALUES ('William', 'widai@ucsc.edu', 'asdf1234', 'test', 'away');
INSERT INTO workspace (name, users) VALUES ('Main', ARRAY ['Michael', 'Nathan']);
INSERT INTO channel (workspaceid, name, users) SELECT id, 'General', ARRAY ['Michael', 'Nathan'] FROM workspace;