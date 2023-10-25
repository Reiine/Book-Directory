const dotenv = require('dotenv');
dotenv.config();
const Pool = require('pg').Pool;

const pool = new Pool({
    user:"postgres",
    host: "localhost",
    database: "books",
    password: process.env.POSTGRES_PASS,
    port: 5432,
});

module.exports = pool;