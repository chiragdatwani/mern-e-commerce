import express from 'express';
const router = express.Router();
import { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser } from '../controllers/userController.js';
import {isAdmin, protectRoute} from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protectRoute, isAdmin, getUsers);
router.route('/login').post(authUser);
router.route('/profile').get(protectRoute , getUserProfile).put(protectRoute , updateUserProfile);
router.route('/:id').delete(protectRoute, isAdmin, deleteUser)


export default router;