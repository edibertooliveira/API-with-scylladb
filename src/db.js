const cassandra = require("cassandra-driver");

async function getClient(config) {
  const client = new cassandra.Client({
    contactPoints: config.contactPoints,
    authProvider: new cassandra.auth.PlainTextAuthProvider(
      config.username,
      config.password,
    ),
    localDataCenter: config.datacenter,
    keyspace: config.keyspace,
  });

  await client.connect();

  return client;
}

async function getClientWithKeyspace(config) {
  return getClient(config);
}

module.exports = {
  getClient,
  getClientWithKeyspace,
};
