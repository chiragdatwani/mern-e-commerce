import React from 'react';
import Link from 'react-router-dom';
import products from '../../products';
import {Button, Divider, Grid} from '@material-ui/core'
import Stars from '../../components/Stars';
import { InfoContainer, Container, AddToCartContainer, StyledButton, ButtonContainer } from './Product.elements';


function Product(props) {

    const product = products.find((p) => p._id === props.match.params.id)
    console.log(product);
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item md={6} >
                    
                    <img  style={{width: '100%', height: 'auto'}} src={product.image} alt={product.name} />
                     
                </Grid>
                <Grid item md={3} sm={6}>
                    <InfoContainer component='div'>
                    <h2>{product.name}</h2>

                    <Divider/>
                    <Stars rating={product.rating} text={`from ${product.numReviews} reviews`}/>
                    <Divider />
                    <h4>{`Price: $${product.price}`}</h4>
                    <Divider />
                    <p>{product.description}</p>
                    </InfoContainer>
                </Grid>

                <Grid item md={3} sm={6} xs={12}>
                    <AddToCartContainer>
                        <h3>{`Price: $${product.price}`}</h3>
                        <Divider />
                        <h3>{`Status: ${product.countInStock ? 'In Stock': 'Out of stock'}`}</h3>
                        <Divider />
                        <ButtonContainer>
                        <StyledButton variant='contained' disabled={product.countInStock ? false:true} >Add To Cart</StyledButton>
                        </ButtonContainer>
                        
                    </AddToCartContainer>
                </Grid>
            </Grid>
            
        </Container>
    )
}

export default Product
