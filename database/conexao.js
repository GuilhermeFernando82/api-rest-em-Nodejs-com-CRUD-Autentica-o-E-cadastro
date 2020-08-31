const sequeLize = require('sequelize');

const conect = new sequeLize('api-rest','root','',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = conect;