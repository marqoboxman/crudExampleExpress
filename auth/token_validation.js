const {verify} = require("jsonwebtoken");


module.exports  = {
  checkToken: (req, res, next) => {
    let token = req.get("Authorization");
    if(token){
      verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err){
          res.json({
            success: 0,
            message: "Invalid token."
          });
        }else{
          // there is a token
          console.log("hay token la que sigue")
          next();
        }
      });
    }else{
      // there is not token.
      return res.json({
        success:0,
        message: "Access denied! unauthorised user."
      });
    }
  }
}
