import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.headers.access_token;  
  if (!token) {
    
    return next(errorHandler(401, 'cbUnauthorized'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
console.log("Eee");

      return next(errorHandler(401, 'bUnauthorized'));
    }
    req.user = user;

    next();
  });
};
