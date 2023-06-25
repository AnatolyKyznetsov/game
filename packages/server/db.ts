import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { userThemeModel } from './models/userThemeModel';
import { userModel } from './models/userModel';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST } =
    process.env

const sequelizeOptions: SequelizeOptions = {
    username: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    port: Number(POSTGRES_PORT),
};

export const sequelize = new Sequelize(sequelizeOptions);

export const UserTheme = sequelize.define(
    'UserTheme',
    userThemeModel,
    {
        timestamps: false
    }
);

export const User = sequelize.define(
    'User',
    userModel,
    {
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: [ 'login' ]
            },
        ]
    }
);

UserTheme.belongsTo(User, {
    onDelete: 'CASCADE',
    foreignKey: 'userId'
})

export async function dbConnect() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
