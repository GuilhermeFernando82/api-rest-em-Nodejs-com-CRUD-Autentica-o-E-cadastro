const squeLize = require('sequelize');
const connection = require('./conexao');

const user = connection.define('clientes',{
    name:{
        type: squeLize.STRING,
        allowNull: false,
    },
    email:{
        type: squeLize.TEXT,
        allowNull: false,
    },
    password:{
        type: squeLize.TEXT,
        allowNull: false,
    },
 

});
user.sync({force:false}).then(() =>{console.log('Tabela Criada')}).catch(() => {console.log('Erro ao criar tabela')})
module.exports = user;