import React from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Grid, Paper, Typography} from '@material-ui/core';
import {StyledLink} from './Product.elements'
import Stars from '../Stars/index'


function Product({product}) {

    
    return (
        <Grid  item xs={12} sm={4}  md={3}>
            <Paper elevation={6}>
            <Card >
                <StyledLink to={`/product/${product._id}`} >
                
                <CardActionArea>
                    <CardMedia 
                        component='img'
                        image={product.image}
                        title={product.name}
                    />
                    <CardContent>
                        <Typography
                        
                        variant='h6'>
                            {product.name}
                        </Typography>
                        
                        <Stars rating={product.rating} text={`from ${product.numReviews} reviews`} />
                        
                        <Typography 
                        variant='h4'>
                            {`$${product.price}`}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                </StyledLink>
            </Card>
            </Paper>
        </Grid>
    )
}

export default Product;
