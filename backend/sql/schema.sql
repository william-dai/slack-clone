-- Dummy table --
DROP TABLE IF EXISTS dummy;
CREATE TABLE dummy(created TIMESTAMP WITH TIME ZONE);

-- Your database schema goes here --
-- DROP TABLE IF EXISTS user;
CREATE TABLE users(name VARCHAR(32), pass VARCHAR(32), workspace VARCHAR(32), status VARCHAR(32));

-- DROP TABLE IF EXISTS workspace;
CREATE TABLE workspace(name VARCHAR(32), users jsonb);

-- DROP TABLE IF EXISTS channel;
CREATE TABLE channel(name VARCHAR(32), users jsonb);

-- DROP TABLE IF EXISTS message;
CREATE TABLE message(createdby jsonb, createdtime TIMESTAMP, content VARCHAR(1000), replies jsonb, reactions VARCHAR(32));