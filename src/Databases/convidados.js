import  { DataTypes } from 'sequelize';
import  { sequelize } from "./DataBaseConnection.js";
// Importa a instância do Sequelizeconst User = sequelize.define('User', {
const Convidados = sequelize.define('convidado', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hash_convite: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    participara: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      hash_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  }, {
    tableName: 'Convidado',
    timestamps:false // Nome da tabela no banco de dados
  });
  
  // Exporta o modelo
  export {Convidados};