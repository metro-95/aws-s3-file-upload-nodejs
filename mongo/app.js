require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
const Auth = require('./models/auth')
var userroutes = require('./routes/userroute');
var authroutes = require('./routes/authroute')
const test = require('./routes/test')
const validateToken = require('./middlewares/tokenvalidation')

const app = express();
/** Middlewares */
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');



userroutes(app);
authroutes(app);

/**TODO: CHANGE AUTHORIZATION TOKEN FROM HEADER TO BEARER TOKEN */
app.use("/test", validateToken, test);
const uri = process.env.url;


mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open',function(){
    console.log('Database connected Successfully');
}).on('error',function(err){
    console.log('Error', err);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, function () {
    console.log('Listening to Port 3000');
});