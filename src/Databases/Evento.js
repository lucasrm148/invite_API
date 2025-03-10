import { DataTypes } from 'sequelize';
import { sequelize } from "./DataBaseConnection.js";
// Importa a instância do Sequelizeconst User = sequelize.define('User', {

const Evento = sequelize.define('evento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    hash_organizador: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    data: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    forma_pagamneto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'evento',
    timestamps: false // Nome da tabela no banco de dados
});

 // Exporta o modelo
 export {Evento};