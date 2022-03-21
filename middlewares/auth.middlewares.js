/**
 * Required modules.
 */
const { getAuthenticationToken, decodeAuthenticationToken } = require('../helpers');
const { findUserByDecodedToken } = require('../models/operators');
 
 // Basic user authentication.
 const isUserAuthenticated = async (req, res, next) => {
     try {
         // Get the user authentication token.
         const token = getAuthenticationToken(req);
         if (token.success === false) {
             console.log(JSON.stringify(token));
             return res.status(401).json(token);
         }
 
         // Decode the authentication token got previously.
         const decodedToken = decodeAuthenticationToken(token);
         if (decodedToken.success === false) {
             console.log(JSON.stringify(decodedToken));
             return res.status(401).json(decodedToken);
         }
 
         // Find a user with the info from decoded token.
         const user = await findUserByDecodedToken(decodedToken);
         if (user.success === false) {
             console.log(JSON.stringify(user));
             return res.status(404).json(user);
         }
 
         // Get the plain UTC time format as the 'exp' one from the JWT.
         // Otherwise the 'new Date().getTime()' will be converted to you local timezone
         // when is compared, which could be a different one than the jwt-issuer.
         const currentDate = new Date().getTime() / 1000;
 
         // Rebuild the user session object if it has not been logged out when the API was restarted.
         // It'll be useful in order to perform a log out and update the user session status.
         if (!req.session.user && user.sessionExpired === false) {
             const authenticated = {
                 name: user.name,
                 email: user.email,
                 token: user.sessionToken
             };
 
             req.session.user = authenticated;
         }
 
         if (user.sessionExpired === true || decodedToken.exp < currentDate) {
             const sessionResponse = {
                 success: false,
                 message: 'Your session or access token has expired! You are not authorized to perform this operation!'
             };
 
             console.log(JSON.stringify(sessionResponse));
             return res.status(401).json(sessionResponse);
         }
 
         next();
     } catch (error) {
         console.log(`There was an error with the user authentication: ${JSON.stringify(error)}`);
         return next(error);
     }
 };
 

 
const esAdmin = (req, res, next) => {
    try {
        if (admin) {
            next();
        } else {
            loggerWarn.warn(`Ruta ${req.originalUrl} método ${req.method} no autorizada`);
            res.json({ error : -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizada` })
        }
    } catch (error) {
        loggerWarn.warn(error);
    }
}

 /**
  * User authentication middleware (bearer token).
  */
 module.exports = {
     isUserAuthenticated,esAdmin
 };
 