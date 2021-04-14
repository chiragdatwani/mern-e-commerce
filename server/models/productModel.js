import {model, Schema} from 'mongoose';

const ReviewSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {timestamps: true})

const ProductSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User '
    },
    name: {
        type: String,
        required: true
    }, 
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock:{
        type: Number,
        required: true,
        default: 0
    }
})

const Prodcut = model('Product', ProductSchema);

export default Product;