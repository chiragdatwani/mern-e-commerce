import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'


// @desc Auth user, get token
// @route POST /api/users/login
// @access Public
export const authUser = asyncHandler( async (req,res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    
    if(user){
        const passwordCorrect = await bcrypt.compare(password,user.password);
        if(passwordCorrect){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: null
            })
        }else{
            res.status(401)
            throw new Error('Invalid email or password')
        }
        
    } else {
        res.status(401)
            throw new Error('Invalid email or password')
    }

});