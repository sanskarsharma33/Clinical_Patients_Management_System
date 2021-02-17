const jwt = require("jsonwebtoken");


module.exports = function(req, res, next) {
  if(!req.headers.authorization){
    return res.status(401).json({ message: "Auth Error" });
  }
  let token = req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Auth Error" });
  try {
    const decoded = jwt.verify(token, "randomString");
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};
