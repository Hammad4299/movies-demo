import { User, Movie } from "@/models";
import { sequelizeClient } from "../sequelize";
import { DataTypes, Model } from "sequelize";
import UserModel from "@/db/models/UserModel";

interface MovieModelType extends Movie, Model<Movie> { }

export const MovieModel = sequelizeClient.define<MovieModelType>(
    "movie",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        poster: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            defaultValue: false,
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: true,
    }
);

MovieModel.belongsTo(UserModel);

export default MovieModel;
