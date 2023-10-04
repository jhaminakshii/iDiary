const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUserData = require("../middleware/fetchuserdata");
const JWT_SECRET = 'jhaminakshisecretcode';


//Route 1:Create a user using: POST "api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    // password must be at least 5 chars long
    body("password", "password must be atleast 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    try {
      // if there are error return bad request and error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
      }
      //check wheather the user with same email already exist
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, errors: "sorry a user with this email already exists" });
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
      success = true;
      res.json({ success,authToken }); 

    } catch (error) {
      console.error(error.message)
      res.status(500).send('some error occured')
    }
     }
);

// Route 2:Authenticate a user using: POST "api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
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
        success=false;
        return res.status(400).json({success,error:"Please try to login with correct credentials"})
      }
      let data = { user: { id: user.id } };
      const authToken = jwt.sign(data, JWT_SECRET);
       success=true;
      res.json({success, authToken }); 
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// Route 3: Get loggedin user details using: POST "api/auth/getuser".Login required

 router.post("/getuser", fetchUserData, async (req,res) => {
   try {
     userId = req.user.id ;
     const user = await User.findById(userId).select("-password");
     res.json(user);
   } catch (error) {
     console.error(error.message);
     res.status(500).send("Internal server error");
   }
 });  

module.exports = router;
