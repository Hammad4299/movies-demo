
import { Sequelize } from "sequelize";
import databaseConfig from "./config";



export const sequelizeClient = new Sequelize({
  dialect: "postgres",
  storage: databaseConfig.database_url,
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
