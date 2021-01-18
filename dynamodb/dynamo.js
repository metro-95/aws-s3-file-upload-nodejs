var dynamo = require('dynamodb');
const Joi = require('joi');
require('dotenv').config()


/** Set AWS Access Keys */
dynamo.AWS.config.update({
    accessKeyId: process.env.S3_ACCESSKEYID,
    secretAccessKey: process.env.S3_SECRETACCESSKEY,
    region: process.env.S3_REGION,
});

/** Define Table Model */
var User = dynamo.define('User', {
    hashKey : 'email',
    timestamps : true,
    schema : {
      email   : Joi.string().email(),
      name    : Joi.string(),
      age     : Joi.number(),
    }
  });

  /** Create Table */
  dynamo.createTables({
    'User': {readCapacity: 20, writeCapacity: 4}
  }, function(err) {
    if (err) {
      console.log('Error creating table: ', err);
    } else {
      console.log('Table created');
    }
  });

/** Link Model with Table */
User.config({tableName: 'user'});

/** Insert Data into DynamoDB */
User.create({
  email: 'johnsmith@gmail.com',
  name: 'John Smith',
  age: 34
}, function (err, res) {
  console.log('Created Data Successfully', res.get('email'));
});

/** Update Data into DynamoDB */
User.update({
  email: 'johnsmith@gmail.com',
  name: 'John M. Smith',
  age: 34
}, function (err, res) {
  console.log('Created Data Successfully', res.get('name'));
});

/** Delete Data from DynamoDB */
User.destroy('foo3@example.com', function (err) {
  console.log('Data Deleted');
});

/** Get Data from DynamoDB */
User.get('johnsmith@gmail.com', {ConsistentRead: true, ProjectionExpression : 'email, age'}, function (err, res) {
  console.log('We got an User', res.get('email'));
  console.log(res.get('name'));
  console.log(res.get('age'));
});

/** Get All Data from DynamoDB */
User.scan().loadAll().exec(function(err, res) {
    var users = [];
    users = users.concat(res.Items);

    users.forEach(function(user) {
        console.log(user.attrs)
    });

  });
