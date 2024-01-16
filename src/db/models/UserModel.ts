import { User, Movie } from "@/models";
import { sequelizeClient } from "../sequelize";
import { DataTypes, Model } from "sequelize";

interface UserModelType extends User, Model<User> { }

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

export default UserModel;
