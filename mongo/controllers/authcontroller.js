var mongoose = require('mongoose')
const Joi = require('joi')
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation/authvalidation')
Auth = mongoose.model('Auth');



/** Create User */
exports.create = async (req, res) => {
  
    /** Validate User */
    const { error } = registerValidation(req.body);
    const isEmailExist = await Auth.findOne({ email: req.body.email });


    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    if (isEmailExist) {
        return res.status(400).json({ error: "Email already exists" });
    }

    /** Let's Hash the Password */
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    
    const user = new Auth({
        name: req.body.name,
        email: req.body.email,
        password,
    });

    try {
        const savedUser = await user.save();
        res.json({ error: null, data: { userId: savedUser._id } });
      } catch (error) {
        res.status(400).json({ error });
      }

}

/** Login User */
exports.login = async (req, res) => {
    /** User Validation */
  const { error } = loginValidation(req.body); 
  if (error) return res.status(400).json({ error:   error.details[0].message });  

  const user = await Auth.findOne({ email: req.body.email });  
  if (!user) return res.status(400).json({ error: "Email is wrong" }); 

  const validPassword = await bcrypt.compare(req.body.password, user.password); 
  if (!validPassword) return res.status(400).json({ error: "Password is wrong" }); 
  
   /** Create Valid Token */
   const token = jwt.sign(
    /** Payload Data for Token */
    {
      name: user.name,
      id: user._id,
    },
    process.env.TOKEN_SECRET
  );

  res.json({
    error: null,
    data: {
      message: "Login successful",
      token
    }
  })

  // res.header('auth-token', token).json({
  //   error: null,
  //   data: {
  //     message: "Login successful",
  //     token
  //   },
  // });

}
