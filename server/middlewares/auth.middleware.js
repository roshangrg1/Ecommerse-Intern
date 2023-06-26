import User from '../models/user.schema.js'
import JWT from 'jsonwebtoken'
import tryCatchHandler from '../services/tryCatchHandler.js'
import CustomError from '../utils/customError.js'

import AuthRoles from '../utils/authRoles.js'

import config from "../config/index.js"

export const isLoggedIn = tryCatchHandler(async(req,res,next)=>{
    let token;

    if(
        req.cookies.token || 
        (req.headers.authorization && req.headers.authorization.startsWith('Bearer')))
        {
            token = req.cookies.token || req.headers.authorization.split(" ") [1]
        }
    
        if (!token){
            throw new CustomError('Not authorized to excess this route', 401)
        }

        try{
            const decodedJwtPayload = JWT.verify(token, config.JWT_SECRET)

            // _id, find user based on id , set this in req.user
            req.user = await User.findById(decodedJwtPayload._id, "name email roles")
            next()
        } catch (error){
            throw new CustomError('Not authorized to access this route', 401)
        }
})


export const customRole = (authrole) => {
    console.log(authrole)
    return (req, res, next) => {
      console.log(req.user.roles)
      if (authrole !== req.user.roles) {
        return next(new CustomError(`${req.user.roles}You are not allowed for this resouce`, 403));
      }
      next();
    };
  };

