import React from 'react'
import { Grid } from '@material-ui/core';
import {CardContainer, ImageContainer, Info, StyledLink} from './Product.elements'
import Stars from '../Stars/index'


function Product({product}) {

    
    return (
        <Grid item  md={3}>
            <StyledLink to={`/product/${product._id}`} >
            <CardContainer elevation={5}>
                <ImageContainer className='card-img'>
                    <img src={product.image} alt={product.name}/>
                </ImageContainer>
                <Info>
                    <h4>{product.name}</h4>
                    <Stars rating={product.rating} text={`from ${product.numReviews} reviews`} />
                    <p>${product.price}</p>
                </Info>
            </CardContainer>
            </StyledLink>
            
        </Grid>
    )
}

export default Product;
