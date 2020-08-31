const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const User = require('./database/user');
const produto = require('./database/produto');
const bcrypt = require('bcrypt');
const { use } = require('bcrypt/promises');
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('view engine', 'ejs') 


app.listen(8080,'192.168.15.13', function (err){
    if(err){
        console.log('Error')
    }else{
        console.log('Ok')
    }
});

app.use(session({
    secret: "MySecret",
    cookie: {
        maxAge:240000
    }
}))
app.get('/', (req,res) =>{
    res.send('Ok')
})
app.post('/products-create', (req, res)=>{
    var name = req.body.name
    var desc = req.body.desc
    var username = req.session.user.name
    produto.create({
        name_user: username,
        name: name,
        desc: desc,

    }).then(() => { return res.send('Inserido com sucesso')}).catch(()=>{return res.send('Falha')})
})
app.put('/products-update/:id', (req, res)=>{
   var name = req.body.name
    var desc = req.body.desc
    var id = req.params.id;
   produto.findOne({where:{id:id}}).then(produtos =>{
    if(produtos != undefined){
        produtos.update({
            name: name,
            desc: desc
        })
        return res.send(produtos)
    }else{
        return res.send('Falha')
    }
}).catch(() => {return res.send('Erro')})
})
app.get('/showall', (req, res)=>{
     produto.findAll().then(produtos =>{
     if(produtos != undefined){
            res.json(produtos)
     }else{
         return res.send('Not Found')
     }
 }).catch(() => {return res.send('Erro')})
})
app.get('/show/:user', (req,res)=>{
    var user = req.params.user
    produto.findAll({where:{name_user: user}}).then(produtos =>{
     if(produtos != undefined){
          res.json(produtos)
     }else{
         return res.send('Not Found')
     }
 }).catch(() => {return res.send('Erro')})
})
app.delete('/remove/:id', (req, res)=>{
    var id = req.params.id;
    produto.findOne({where:{id:id}}).then(produtos =>{
     if(produtos != undefined){
         produtos.destroy()
         return res.send(produtos)
     }else{
         return res.send('Falha')
     }
 }).catch(() => {return res.send('Erro')})
 })
app.post('/register', (req, res, next) => {
    var name = req.body.name
    var email = req.body.email
    var password = req.body.password
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(password, salt)
    User.create({
        name: name,
        email: email,
        password: hash
    }).then(() => {return res.send('Sucesso')}).catch(()=>{return res.send('Falha')})
})
app.post('/authenticate', (req,res)=>{
    var email = req.body.email
    var password = req.body.password
    User.findOne({where:{email:email}}).then(user =>{
        if(user != undefined){
            var verify = bcrypt.compareSync(password,user.password)
        }
            if(verify){
            req.session.user = {
                id: user.id,
                name: user.name,
                email: user.email,
            }
                return res.send(req.session.user)
            }else{
                return res.send('Falha')
            }
    }).catch(() => {return res.send('Erro')})
})
app.get('/user', (req,res)=>{
    res.json({
        id: req.session.user.id,
        name: req.session.user.name,
        email: req.session.user.email
    })
})

