import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js'


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
                token: generateToken(user._id)
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

//@desc Get user profile
//@route GET /api/users/profile
//@access Private

export const getUserProfile = asyncHandler( async(req,res) => {
    const user = await User.findById(req.user._id);
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
    res.send('Success')
});


//@desc Update user profile
//@route PUT /api/users
//@access Private

export const updateUserProfile = asyncHandler( async (req,res) => {

    const user = await User.findById(req.user._id);

    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password || user.password
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
});

//@desc Register new User
//@route POST /api/users
//@access Public

export const registerUser = asyncHandler(async (req,res) => {
    const {name, email, password} = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        res.status(201)
        res.json(
            {_id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)}
            )
    }else{
        res.status(400)
        throw new Error('Invalid User Data')
    }
});

//@desc Get User List
//@route GET /api/users
//@access Private/Admin

export const getUsers = asyncHandler( async( req, res )=> {
    const users = await User.find({})
    res.json(users)
});

//@desc Delete User
//@route DELETE /api/users/:id
//@access Private/Admin

export const deleteUser = asyncHandler( async( req, res )=> {
    const user = await User.findById(req.params.id)
     if(user){
        await user.remove()
        res.json({ message: 'User Deleted' })
     }else{
         res.status(404);
         throw new Error('User Not Found')
     }
    res.json(users)
});
