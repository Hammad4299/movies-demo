import { User, Movie } from "@/models";
import { sequelizeClient } from "../sequelize";
import { DataTypes, Model } from "sequelize";
import MovieModel from "@/db/models/MovieModel";

interface UserModelType extends User, Model<User> { }

// define user model
export const UserModel = sequelizeClient.define<UserModelType>(
    "user",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

// associations can be defined here
// UserModel.hasMany(MovieModel, {
//     foreignKey: 'userId',
//     as: 'movies',
//     onDelete: 'CASCADE',
// });

export default UserModel;
