import express from 'express';
import {isAdmin, protectRoute} from '../middleware/authMiddleware.js';
const router = express.Router();

import { getProducts, getProductById, deleteProduct, updateProduct, createProduct } from '../controllers/productController.js'

router.route('/').get(getProducts).post(protectRoute, isAdmin, createProduct);

router.route('/:id').get(getProductById).delete(protectRoute, isAdmin, deleteProduct).put(protectRoute, isAdmin, updateProduct);

export default router