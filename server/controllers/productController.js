import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js';


// @desc Fetch all products
// @route GET /api/products
// @access Public
export const getProducts = asyncHandler( async (req,res) => {
    const products = await Product.find({});
    res.json(products)
});


// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
export const getProductById = asyncHandler( async (req,res) => {
    const product = await Product.findById(req.params.id);
    
    if(product){
        res.json(product);
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
});

// @desc Delete Product
// @route DELETE /api/products/:id
// @access Private/Admin
export const deleteProduct = asyncHandler( async (req,res) => {
    const product = await Product.findById(req.params.id);
    
    if(product){
        await product.remove();
        res.json({message: 'Product deleted'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
});

// @desc Create Product
// @route POST /api/products/
// @access Private/Admin
export const createProduct = asyncHandler( async (req,res) => {

    const product = new Product({
        name: 'Product',
        price: 0,
        user: req.user._id,
        image: '/image/sample.jpg',
        brand: 'Brand',
        category: 'Category',
        countInStock: 0,
        numReviews: 0,
        description: 'Product Description'
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct)
    
});

// @desc Update Product
// @route PUT /api/products/:id
// @access Private/Admin
export const updateProduct = asyncHandler( async (req,res) => {

    const { name, price, description,
    image, brand, category, countInStock } = req.body;

    const product = await Product.findById(req.params.id);

    if(product){

        product.name = name,
        product.price = price,
        product.description = description,
        product.image = image,
        product.brand = brand,
        product.category = category,
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct);
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
    
});


