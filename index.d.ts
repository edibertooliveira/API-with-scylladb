interface Config {
  hosts: string[];
  username: string;
  password: string;
  datacenter: string;
  keyspace: string;
}

interface Table {
  tableName: string;
  columns: string[];
}
