import { DataTypes } from 'sequelize';
import { sequelize } from './DataBaseConnection.js';

const Presente = sequelize.define('presente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    hash_presente: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    hash_evento: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    preco: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    max_selecionados: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    n_selecionados: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'presentes',
    timestamps: false,
});

export { Presente };
