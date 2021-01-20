require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
var routes = require('./routes/userroute');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);
const uri = process.env.url;


mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open',function(){
    console.log('Database connected Successfully');
}).on('error',function(err){
    console.log('Error', err);
});

app.listen(3000, function () {
    console.log('Listening to Port 3000');
});