-- Dummy Data --
INSERT INTO dummy (created) VALUES (current_timestamp);

-- Populate Your Tables Here --
INSERT INTO users (name, pass, workspace, status) VALUES ('Michael', 'abc123', 'test', 'online');
INSERT INTO workspace (name, users) VALUES ('Main', ARRAY ['Michael', 'Nathan']);
INSERT INTO channel (workspaceid, name, users) SELECT id, 'General', ARRAY ['Michael', 'Nathan'] FROM workspace;