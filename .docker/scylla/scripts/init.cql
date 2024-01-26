CREATE KEYSPACE development WITH replication = {'class': 'NetworkTopologyStrategy', 'replication_factor': '3'} AND durable_writes = true;

USE development;

CREATE TABLE songs ( id uuid, title text, album text, artist text, created_at timestamp, updated_at timestamp, PRIMARY KEY (id, updated_at));

INSERT INTO songs (id, title, album, artist, created_at, updated_at) VALUES (d754f8d5-e037-4899-aa75-44587b9cc425, 'Stairway to Heaven', 'Led Zeppelin IV', 'Led Zeppelin', '2023-03-02 22:00:00', '2023-03-02 22:00:00');

INSERT INTO songs (id, title, album, artist, created_at, updated_at) VALUES (d754f8d5-e037-4893-ad75-44587b9cc425, 'Glimpse of Us', 'Smithereens', 'Joji', '2023-03-02 22:00:00', '2023-03-02 22:00:00');

INSERT INTO songs (id, title, album, artist, created_at, updated_at) VALUES (d754f8d5-e037-4891-ab75-44587b9cc425, 'Vegas', 'From Movie ELVIS', 'Doja Cat', '2023-03-02 22:00:00', '2023-03-02 22:00:00');