const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = 'jhaminakshisecretcode'

//Create a user using: POST "api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    // password must be at least 5 chars long
    body("password", "password must be atleast 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      // if there are error return bad request and error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //check wheather the user with same email already exist
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ errors: "sorry a user with this email already exists" });
      }
      // Store hash in your password DB.
      var salt = await bcrypt.genSalt(10);
      var secPass = await bcrypt.hash(req.body.password, salt);

      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      let data = {user:{id:user.id}}
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(authToken);
      res.json({authToken}); 

    } catch (error) {
      console.error(error.message)
      res.status(500).send('some error occured')
    }
     }
);

//Authenticate a user using: POST "api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // if there are error return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 
    const {email,password} = req.body;
    try {
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error:"Please try to login with correct credentials"})
      }
      const comparePass =await bcrypt.compare(password,user.password);
      if(!comparePass){
        return res.status(400).json({error:"Please try to login with correct credentials"})
      }
      let data = { user: { id: user.id } };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken }); 
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
)
   

module.exports = router;
