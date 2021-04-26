import express from 'express';
const router = express.Router();
import { protectRoute } from '../middleware/authMiddleware.js';
import { addOrderItems, getOrderById } from '../controllers/orderController.js'

router.route('/').post(protectRoute, addOrderItems);
router.route('/:id').get(protectRoute, getOrderById);

export default router;