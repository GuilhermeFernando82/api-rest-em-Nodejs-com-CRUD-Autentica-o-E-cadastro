const express = require('express')
const user = require('./user');
const User = require('./user');
const route = express.Router();

route.post('register', async (req, res) => {
    try{
        const user = await User.create(req.body)
        return res.send({user})
    }catch(err){
        return res.status(400).send({ err: 'Register Failed'});
    }
})
module.exports = app => app.use('/auth', route);