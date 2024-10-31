import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('invite', 'user_invite', 'Salmo 91:7', {
    host: 'localhost',    // O host onde o banco de dados está rodando
    port: 3306,             // Porta do banco de dados
    dialect: 'mysql', 
});
sequelize.authenticate()
  .then(() => console.log('Conexão com o banco de dados bem-sucedida.'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));
export {sequelize};