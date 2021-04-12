import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import Product from '../../components/Product'
import products from '../../products'

function HomePage() {
    return (
        <div>
            <h1>Latest Products</h1>
            <Grid container spacing={3}>
                {products.map( product => (
                     <Product key={product._id}product={product}/>
                ))}
            </Grid>
        </div>
    )
}

export default HomePage
