import React from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Grid, Paper, Typography} from '@material-ui/core';
import {StyledLink} from './Product.elements'
import Stars from '../Stars/index'


function Product({product}) {

    
    return (
        <Grid  item xs={12} sm={4}  md={3}>
            <Paper elevation={6}>
            <StyledLink to={`/product/${product._id}`} >
            <Card style={{display: 'flex'}}>
                
                
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
                
            </Card>
            </StyledLink>
            </Paper>
        </Grid>
    )
}

export default Product;
