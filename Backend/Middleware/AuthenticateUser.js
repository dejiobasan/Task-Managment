const jwt = require("jsonwebtoken");


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(401).send('Unauthorized')
  
  jwt.verify(token, process.env.jwtSecret, (err, user) => {
    if(err) return res.sendStatus(403)
    req.user = user;
    next()
  });
};

module.exports = authenticateToken;