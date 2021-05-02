import express from 'express';
const router = express.Router();
import { isAdmin, protectRoute } from '../middleware/authMiddleware.js';
import { addOrderItems, getOrderById, getUserOrders, updateOrderToPaid, getOrders, updateOrderToDelivered } from '../controllers/orderController.js'

router.route('/').post(protectRoute, addOrderItems).get(protectRoute, isAdmin, getOrders);
router.route('/myorders').get(protectRoute, getUserOrders);
router.route('/:id').get(protectRoute, getOrderById);
router.route('/:id/pay').put(protectRoute, updateOrderToPaid);
router.route('/:id/deliver').put(protectRoute, isAdmin, updateOrderToDelivered);


export default router;