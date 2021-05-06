import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js';


// @desc Fetch all products
// @route GET /api/products
// @access Public
export const getProducts = asyncHandler( async (req,res) => {
    const pageSize = 4;
    const page = Number(req.query.page) || 1;
    const count = await Product.countDocuments({});
    const products = await Product.find({}).limit(pageSize).skip(pageSize * (page - 1))
    res.json({products, page, totalPages: Math.ceil(count / pageSize)})
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

// @desc Search products
// @route GET /api/products/search/:keyword
// @access Public
export const searchProducts = asyncHandler( async (req,res) => {

    const keyword = req.params.keyword
    const regex = new RegExp(keyword, 'ig')
    const products = await Product.find({name: regex});
    res.json(products)
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
        image: '/images/sample.jpg',
        author: 'Author',
        category: 'Category',
        ISBN: '0000000000',
        publication: 'Publication',
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
    image, publication, author, category, countInStock } = req.body;

    const product = await Product.findById(req.params.id);

    if(product){

        product.name = name,
        product.price = price,
        product.description = description,
        product.image = image,
        product.publication = publication,
        product.author = author,
        product.category = category,
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct);
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
    
});

// @desc Add new review
// @route POST /api/products/:id/reviews
// @access Private
export const addProductReview = asyncHandler( async (req,res) => {

    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if(product){
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
        if(alreadyReviewed){
            res.status(400)
            throw new Error('Already Reviewed')
        }
        
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review)

        product.numReviews = product.numReviews + 1

        product.rating = Number(product.reviews.reduce((acc, item) => ( acc + item.rating), 0) / product.reviews.length).toFixed(2);

        await product.save()
        res.status(201).json({message: 'Review Added'});
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
    
});

// @desc Get Top Products
// @route GET /api/products/top
// @access Public
export const getTopProducts = asyncHandler( async (req,res) => {

    const products = await Product.find({}).sort({ rating: -1}).limit(4);
    res.json(products)
});