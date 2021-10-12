var createError = require("http-errors");

var env = process.env;

const RoutesAuthentication = async function (req, res, next) {
  if (req.params.unityID === env.AUTHENTICATED_USR) {
    return next();
  }
  else if(env.AUTHENTICATED_USR){
    return next();
  }
  else{
    return next(createError(401, "Invalid Authentication."))
  }
  
};

module.exports = RoutesAuthentication;
