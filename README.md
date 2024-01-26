# API com scylladb
Este repositório contém instruções e recursos para configurar três cluster Scylla e demostrar a execução em uma API simples. Para detalhes abrangentes, consulte sobre o uso de drivers Scylla.

## Começando

1. Navegue até o diretório do projeto:

    ```bash
    cd api-with-scylla-db
    ```

2. Inicie o Cluster Scylla usando o Docker:

    ```bash
    docker-compose up -d
    ```
    OBS: Necessario validar se todos os cluster's terminaram sua inicialização para executar o proximo passo.

3. Acesse o shell Bash em um nó específico (scylla-node1, scylla-node2, scylla-node3):

    ```bash
    docker exec -it scylla-node1 bash
    ```

4. (OPCIONAL) Execute comandos Scylla dentro do nó, como:
    - Para verificar o status do nó:

        ```bash
        nodetool status
        ```

    - Para acessar o shell CQL:

        ```bash
        cqlsh
        ```

## Importação Automática de keyspaces e inserção de Dados

Para importar automaticamente, execute a seguencia de comandos na pasta api-with-scylla-db

```bash
npm run dkc:migrate 
## ou
docker exec -it scylla-node1 cqlsh -f /scripts/init.cql
```

## Configuração Manual de keyspaces e inserção de Dados

Para configurar manualmente o keyspace de rastreamento e adicionar dados:

1. Acesse o shell CQL no nó:

    ```bash
    docker exec -it scylla-node1 cqlsh
    ```

2. Execute os seguintes comandos CQL:

    ```cql
    CREATE KEYSPACE developement WITH replication = {'class': 'NetworkTopologyStrategy', 'replication_factor': '3'} AND durable_writes = true;

    USE developement;

    CREATE TABLE songs ( id uuid, title text, album text, artist text, created_at timestamp, updated_at timestamp, PRIMARY KEY (id, updated_at));

    INSERT INTO songs (id, title, album, artist, created_at, updated_at) VALUES (d754f8d5-e037-4899-aa75-44587b9cc425, 'Stairway to Heaven', 'Led Zeppelin IV', 'Led Zeppelin', '2023-03-02 22:00:00', '2023-03-02 22:00:00');

    INSERT INTO songs (id, title, album, artist, created_at, updated_at) VALUES (d754f8d5-e037-4893-ad75-44587b9cc425, 'Glimpse of Us', 'Smithereens', 'Joji', '2023-03-02 22:00:00', '2023-03-02 22:00:00');

    INSERT INTO songs (id, title, album, artist, created_at, updated_at) VALUES (d754f8d5-e037-4891-ab75-44587b9cc425, 'Vegas', 'From Movie ELVIS', 'Doja Cat', '2023-03-02 22:00:00', '2023-03-02 22:00:00');
    -- Continue inserindo dados adicionais...
    ```

## Acesso a API
Acesse o shell CQL no nó:

```bash
GET http://localhost:3003 HTTP/1.1
content-type: application/json

###

POST http://localhost:3003 HTTP/1.1
content-type: application/json

[
    {"id":7,"title":"Stairway to Heaven","album":"Led Zeppelin IV","artist":"Led Zeppelin","createdAt":"2023-03-02 22:00:00","updatedAt":"2023-03-02 22:00:00"},
    {"id":8,"title":"Glimpse of Us","album":"Smithereens","artist":"Joji","createdAt":"2023-03-02 22:00:00","updatedAt":"2023-03-02 22:00:00"},
    {"id":9,"title":"Vegas","album":"From Movie ELVIS","artist":"Doja Cat","createdAt":"2023-03-02 22:00:00","updatedAt":"2023-03-02 22:00:00"}
]
```

OBS: Como opção pode ser usado a extensão do vscode REST Client e usar o arquivo `routes.http`

## Destruição do Cluster Scylla

Para parar e remover o Cluster Scylla, execute a seguencia de comandos na pasta api-with-scylla-db

```bash
rm -rf ./.docker/scylla/node* ## pode ser necessario o uso do sudo antes do comando
docker-compose kill
docker-compose rm -f
```

