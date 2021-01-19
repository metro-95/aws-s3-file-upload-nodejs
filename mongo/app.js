require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const uri = process.env.url;

/** Add New Item */
app.post('/add', function(req,res) {
    const usr = new User(req.body);
    usr.save().then(val => {
      res.json({ msg: "User Added Successfully", val: val })
    })
});

/** Get All Items */
app.get('/', function(req, res) {
    User.find({}, function(err, users) {
       res.send({users: users});
    });
});

/** Get Single Item By ID */
app.get('/user/:id', function(req, res, next) {
    const id = req.params.id;
    User.findById(id, function(err, result){
      if(err) return next(err);
      res.send(result);
    });
});

/** Update Item */
app.put('/user/:id', (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    User.findByIdAndUpdate(id, data, (err, result) => {
        if(err) return next(err);
        res.send(result);
    })
})

/** Delete Item */
app.delete('/user/:id', (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id, (err,result) => {
        if(err) return next(err);
        res.send(result);
    })
})

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open',function(){
    console.log('Database connected Successfully');
}).on('error',function(err){
    console.log('Error', err);
});

app.listen(3000, function () {
    console.log('Listening to Port 3000');
});