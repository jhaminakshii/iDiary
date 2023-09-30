const jwt = require("jsonwebtoken");
const JWT_SECRET = "jhaminakshisecretcode";


const fetchUserData = (req,res,next)=>{
    // Get the user from jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token){
        res.status(400).json({error:'please authenticate with valid token'})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
         res.status(401).json({error:'please authenticate with valid token'}) 
    }
}

module.exports = fetchUserData;