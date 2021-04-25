const jwt = require('jsonwebtoken');
const {findClinic} = require('../helpers/db');


//extract JWT from authorization header
//decode to get email
//check if email is registered
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: 'You must be logged in.' });
  }

  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: 'You must be logged in.' });
    }

    const { email } = payload;

    const clinic = await findClinic( email ); 
    
      if (!clinic) {
        return res.status(401).send({ error: 'You must be logged in.' });
      }
    req.clinic = clinic;

    next();
  });
};
