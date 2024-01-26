const Fastify = require("fastify");
const db = require("./db.js");
const SongRepository = require("./song-repository.js");

const config = {
  datacenter: process.env.DATACENTER || "datacenter1",
  contactPoints: process.env.SCYLLA_CONTACT_POINTS
    ? process.env.SCYLLA_CONTACT_POINTS.split(",")
    : ["localhost:9042", "localhost:9043", "localhost:9044"],
  keyspace: process.env.SCYLLA_KEYSPACE || "development",
  password: process.env.SCYLLA_PASSWORD || "cassandra",
  username: process.env.SCYLLA_USERNAME || "cassandra",
};

const PORT = process.env.PORT || 3003;
const HOST = process.env.HOST || "0.0.0.0";

const fastify = Fastify({
  logger: true,
});

function handleSongs({ db, utils }) {
  const songsRepo = new SongRepository(db);

  return {
    async add(request, reply) {
      const payload = request.body;
      const result = await songsRepo.insertMany(payload);

      return result;
    },
    async getAll(request, reply) {
      const result = await songsRepo.getMany();

      return result;
    },
  };
}

async function main() {
  try {
    const client = await db.getClientWithKeyspace(config);

    fastify.post(
      "/",
      handleSongs({ db: client, utils: { log: fastify.log } }).add,
    );
    fastify.get(
      "/",
      handleSongs({ db: client, utils: { log: fastify.log } }).getAll,
    );

    await fastify.listen({ port: PORT, host: HOST });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

main();
