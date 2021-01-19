const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },  
    
    email: {
      type: String,
    },

    age: {
        type: Number,
    },

  });
  
  module.exports = mongoose.model('User', userSchema)