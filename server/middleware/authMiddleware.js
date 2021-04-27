import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler'

export const protectRoute = asyncHandler(async (req, res, next) => {
    let token
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed') ;
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not Authorized, no token')
    }
    next()
});

export const isAdmin = ( req, res, next ) => {

    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401)
        throw new Error('Not authorized as an Admin')
    }

}