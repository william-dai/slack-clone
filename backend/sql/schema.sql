-- Dummy table --
DROP TABLE IF EXISTS dummy;
CREATE TABLE dummy(created TIMESTAMP WITH TIME ZONE);

-- Your database schema goes here --
-- DROP TABLE IF EXISTS user;
CREATE TABLE users(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), name VARCHAR(32), email VARCHAR(32), pass VARCHAR(64), roles TEXT [], workspace VARCHAR(32), status VARCHAR(32));

-- DROP TABLE IF EXISTS workspace;
CREATE TABLE workspace(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), name VARCHAR(32), users TEXT []);

-- DROP TABLE IF EXISTS channel;
CREATE TABLE channel(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), workspaceid UUID, category VARCHAR(32), name VARCHAR(32), users TEXT []);

-- DROP TABLE IF EXISTS message;
CREATE TABLE message(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), channelid UUID, createdby VARCHAR(32), createdtime TIMESTAMP, content VARCHAR(1000), reactions VARCHAR(32));

-- DROP TABLE IF EXISTS reply;
CREATE TABLE reply(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), messageid UUID, createdby VARCHAR(32), createdtime TIMESTAMP, content VARCHAR(1000), reactions VARCHAR(32));