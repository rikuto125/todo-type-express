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
