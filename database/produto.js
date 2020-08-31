const squeLize = require('sequelize');
const connection = require('./conexao');

const produto = connection.define('produtoses',{
    name:{
        type: squeLize.STRING,
        allowNull: false,
    },
    name_user:{
        type: squeLize.STRING,
        allowNull: false,
    },
    desc:{
        type: squeLize.TEXT,
        allowNull: false,
    },

 

});
produto.sync({force:false}).then(() =>{console.log('Tabela Criada')}).catch(() => {console.log('Erro ao criar tabela')})
module.exports = produto;