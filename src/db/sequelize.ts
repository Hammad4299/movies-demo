
import { Sequelize } from "sequelize";
import databaseConfig from "./config";
import * as pg from 'pg';

export const sequelizeClient = new Sequelize({
  dialect: "postgres",
  username: databaseConfig.development.username,
  password: databaseConfig.development.password,
  host: databaseConfig.development.host,
  port: Number(databaseConfig.development.port),
  database: databaseConfig.development.database,
  dialectModule: pg,
});

sequelizeClient
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
export default sequelizeClient;
