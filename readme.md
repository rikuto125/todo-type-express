<!-- TOC -->
* [dockerを使用してmysqlとtodo-appを接続する](#dockerを使用してmysqlとtodo-appを接続する)
* [knex.jsを使用してmigrationを行う](#knexjsを使用してmigrationを行う)
* [立ち上げたmysqlとtodo-appの接続がうまくいかない時](#立ち上げたmysqlとtodo-appの接続がうまくいかない時)
<!-- TOC -->

# dockerを使用してmysqlとtodo-appを接続する
- 1. コマンド実行
```bash
docker-compose up -d
```

- 2. mysqlのコンテナに入るなど...
```bash
docker exec -it mysql bash
```

# knex.jsを使用してmigrationを行う
- 1. knex.jsをインストール
```bash
npm install knex -g
```

- 2. knex.jsを初期化
```bash
  npx knex init or touch knexfile.js
```

- 3. knex.jsの設定を変更
```js
// knexfile.js
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST_DEV,
            user: process.env.DB_USER_DEV,
            password: process.env.DB_PASSWORD_DEV,
            database: process.env.DB_NAME_DEV
        },
        migrations: {
            directory: './migrations'
        }
    }
};

```

- 4. migrationファイルを作成
```bash
    mkdir migrations
    npx knex migrate:make create_users_table
```

- 5. migrationファイルを編集
```js
// 20200526123456_create_users_table.js
// migrations/xxxxxx_create_tasks_table.js
exports.up = function(knex) {
    return knex.schema.createTable('tasks', (table) => {
        table.increments('id').primary();
        table.string('content').notNullable();
        table.integer('status').notNullable().defaultTo(1);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('tasks');
};
```



*実行(1)か実行(2)のどちらかで行う
- 6. migrationを実行(1)
```bash
npx knex migrate:latest
```

- 7. migrationを実行(2) index.tsでmigrationを実行する
```ts
// config/db.ts
import knex from 'knex';
const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[environment];
const db = knex(config);
export default db;

// index.ts
import db from './config/db';
...
app.use('/api', router)

db.migrate.latest().then(() => {
        console.log('Migrations run successfully')
    }
).catch((err: any) => {
        console.log(err)
    }
)
...
```

# 立ち上げたmysqlとtodo-appの接続がうまくいかない時
- 1. mysqlのコンテナに入る
```bash
mysql -u root -p
```

- 2. パスワードを入力
```bash
password
```

- 3. ユーザーの認証プラグインを変更する
```bash
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
```
