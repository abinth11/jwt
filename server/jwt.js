const jwt = require('jsonwebtoken')
module.exports = {
  verifyJwt: (req, res, next) => {
    const token = req.headers["authorization"];
    console.log(token)
    // const token = authHeader && authHeader.split(" ")[1];

    if (token=='null') {
      return res.status(401).json({status:false,message:'Unauthorized'});
    }

    jwt.verify(token, "secret_ke", (err, decoded) => {
      if (err) {
        console.log(err)
        return res.status(403).json({status:false,message:'"Forbidden',err});
      }
      console.log(decoded)
      req.user = decoded;
      next();
    });
  },
};
