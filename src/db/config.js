require("dotenv").config();
module.exports = {
    development: {
        url: "postgres://postgres:123456@127.0.0.1:5432/movies-app",
        // username: process.env.DB_USER,
        // password: process.env.DB_PASSWORD,
        // host: process.env.DB_HOST,
        // database: process.env.DB_NAME,
        // port: process.env.DB_PORT,
        dialect: "postgres",
    },
};
