import express from 'express'
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import products from './data/products.js'
import productRoutes from './routes/productRouter.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

dotenv.config();

connectDB();

const app = express();

app.get('/', (req,res) => {
    res.send('API RUNNING')
})

app.use('/api/products', productRoutes)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} on port ${PORT}`))