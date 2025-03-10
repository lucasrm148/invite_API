import { DataTypes } from 'sequelize';
import { sequelize } from "./DataBaseConnection.js";
// Importa a instância do Sequelizeconst User = sequelize.define('User', {

const Convite = sequelize.define('convite', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    confirmados: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    convidados: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    hash_evento: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hash_convite: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    presente: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'convite',
    timestamps: false // Nome da tabela no banco de dados
});

 // Exporta o modelo
 export {Convite};