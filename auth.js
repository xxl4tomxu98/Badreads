const jwt = require('jsonwebtoken');
const { jwtConfig } = require('./config');
const bearerToken = require('express-bearer-token');

const { User } = require('./db/models');

const { secret, expiresIn } = jwtConfig;


//takes in user and create payload for user
const getUserToken = (user) => {

  const userDataForToken = {
    id: user.id,
    email: user.email
  };
  //generates a token taking in payload, secreate, and expires as three params
  const token = jwt.sign(
    { data: userDataForToken },
    secret,
    { expiresIn: parseInt(expiresIn, 10) }
  );

  return token;
}

//restores req.user to current user with each req so you have access to the users info
const restoreUser = (req, res, next) => {
    const { token } = req
    if(!token){

      //no token token found, so not logged in, and not authorized
      
      return res.set("WWW-Authenticate", "Bearer").status(401).end();

    } else {
      return jwt.verify(token, secret, null, async(err, jwtPayload) => {
        //unauthorize if err obj exists
        if (err) {
          err.status = 401;
          return next(err);
        }

        const { id } = jwtPayload.data;

        try {
          req.user = await User.findByPk(id);
        } catch (e) {
          return next(e);
        }

        //if not valid user returned from db then unauthorize
        if(!req.user) {
          
          return res.set("WWW-Authenticate", "Bearer").status(401).end();
        }

        return next()
      });
    }
}



//exporting as array M.W to use in routes you don't want to be accessed without being logged in 
//bearerToken() function allows parsin of token from req which is being done in restorUser ftn
const requireAuth = [bearerToken(), restoreUser]

module.exports = { getUserToken, requireAuth};
