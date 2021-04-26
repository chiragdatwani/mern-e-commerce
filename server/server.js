import express from 'express'
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import products from './data/products.js'
import productRoutes from './routes/productRouter.js';
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

dotenv.config();

connectDB();

const app = express();

app.use(express.json())

app.get('/', (req,res) => {
    res.send('API RUNNING')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} on port ${PORT}`))