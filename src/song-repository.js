module.exports = class SongRepository {
  tableName = "songs";
  columns = ["id", "title", "album", "artist", "created_at", "updated_at"];

  constructor(client) {
    this.client = client;
  }

  fields() {
    return this.columns.join(", ");
  }

  async insertMany(items) {
    const prepare = (song) => {
      return `INSERT INTO ${this.tableName} (${this.fields()}) VALUES (${song.id}, '${song.title}', '${song.album}', '${song.artist}', '${song.createdAt}', '${song.updatedAt}');`;
    };

    await Promise.all(items.map((song) => this.client.execute(prepare(song))));

    return items;
  }

  async getMany() {
    const prepare = () => {
      return `SELECT * FROM ${this.tableName};`;
    };

    const result = await this.client.execute(prepare());

    return result.rows;
  }
};
