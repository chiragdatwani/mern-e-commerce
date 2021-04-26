import express from 'express';
const router = express.Router();
import { protectRoute } from '../middleware/authMiddleware.js';
import { addOrderItems } from '../controllers/orderController.js'

router.route('/').post(protectRoute, addOrderItems);

export default router;