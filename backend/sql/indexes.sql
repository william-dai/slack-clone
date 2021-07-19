-- Index Your Tables Here --
CREATE INDEX users_idx ON users(name);
CREATE INDEX workspace_idx ON workspace(name);
CREATE INDEX channel_idx ON channel(name);
CREATE INDEX message_idx ON message(content);