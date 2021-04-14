import React, { useEffect, useState } from 'react';
import axios from 'axios'

import {Divider, Grid} from '@material-ui/core'
import Stars from '../../components/Stars';
import { InfoContainer, Container, AddToCartContainer, StyledButton, ButtonContainer } from './Product.elements';
import Loader from '../../components/Loader/Loader'


function Product(props) {

    const [isLoading, setIsLoading] = useState(true)

    const [product, setProduct] = useState({});

    useEffect(()=>{

        const fetchProduct = async() => {
            const {data} = await axios.get(`/api/products/${props.match.params.id}`);
            setIsLoading(false)
            setProduct(data);
        };

        fetchProduct();
    
    }, [props.match])
 
    
    return (
        <Container>
            {isLoading ? <Loader /> :
            
                <Grid container spacing={3}>
                    <Grid item md={6} sm={12} >
                        
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
            }
        </Container>
    )
}

export default Product
