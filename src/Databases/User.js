import { DataTypes } from 'sequelize';
import { sequelize } from '../Databases/DataBaseConnection.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    hash: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    login: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    senha: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pagamento: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'user',
    timestamps: false,
});

export { User };
