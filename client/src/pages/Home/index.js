import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Grid } from '@material-ui/core'
import Product from '../../components/Product'
import Loader from '../../components/Loader/Loader';
// import products from '../../products'

function HomePage() {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        const fetchProducts = async() => {
            const {data} = await axios.get('/api/products')
            setIsLoading(false)
            setProducts(data)
        }
        
        fetchProducts();
    }, [])
    return (
        <div className='home-page'>
            { isLoading ? <Loader /> :
            <>
            <h1>Latest Products</h1>
            <Grid container spacing={2} >
                {products.map( product => (
                     <Product key={product._id}product={product}/>
                ))}
            </Grid>
            </>
            }
        </div>
    )
}

export default HomePage
