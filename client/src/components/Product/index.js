import React, { useEffect, useRef } from 'react'
import { Grid } from '@material-ui/core';
import {CardContainer, ImageContainer, Info, StyledLink} from './Product.elements'
import Stars from '../Stars/index'
import {gsap, TweenMax, Power3 } from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function Product({product}) {

    let prodRef = useRef([]);
    
    useEffect(() => {
        TweenMax.from(prodRef, 1.2, {scrollTrigger: prodRef, opacity: 0, y: 20, ease: Power3.easeOut, delay: 0.5})
    }, [])

    return (
        <Grid item  md={3} ref={ el => prodRef = el }>
            <StyledLink to={`/product/${product._id}`} >
            <CardContainer elevation={5}>
                <ImageContainer className='card-img'>
                    <img src={product.image} alt={product.name}/>
                </ImageContainer>
                <Info>
                    <h4>{product.name}</h4>
                    <Stars rating={product.rating} text={`from ${product.numReviews} reviews`} />
                    <p>${product.price.toFixed(2)}</p>
                </Info>
            </CardContainer>
            </StyledLink>
            
        </Grid>
    )
}

export default Product;
