import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchProduct} from '../../actions/productActions'
import {Divider, FormControl, Grid, InputLabel, Select} from '@material-ui/core'
import Stars from '../../components/Stars';
import { InfoContainer, Container, AddToCartContainer, StyledButton, ButtonContainer, StyledOption } from './Product.elements';
import Loader from '../../components/Loader/Loader'
import { Alert } from '@material-ui/lab';


function Product({match, history}) {

    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();

    const currentProduct = useSelector(state => state.currentProduct);

    const {product, loading, error} = currentProduct;

    useEffect(()=>{

        dispatch(fetchProduct(match.params.id))
        
    }, [dispatch, match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${quantity}`)
    }
    return (
        <Container>
            {loading ? <Loader /> :
                error ? <Alert severity="error">{error}</Alert> :
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
                                {
                                    product.countInStock > 0 &&
                                    <FormControl>
                                    <InputLabel htmlFor='qty'>Quantity</InputLabel>
                                    <Select
                                        value={quantity}
                                        onChange={e => setQuantity(e.target.value)}
                                        // displayEmpty
                                        inputProps={{ 
                                            name: 'quantity',
                                            id: 'qty'
                                         }}
                                    > 
                                        <StyledOption value="" disabled>Quantity</StyledOption>
          
                                        {[...Array(product.countInStock).keys()].map(x => (
                                            <StyledOption key={x+1} value={x+1}>{x + 1}</StyledOption>
                                        ))}
                                    </Select>
                                    </FormControl>
                                }
                                
                                <ButtonContainer>
                                
                                <StyledButton 
                                    variant='contained' 
                                    disabled={product.countInStock ? false:true} 
                                    onClick={()=>{addToCartHandler()}}
                                    >Add To Cart</StyledButton>
                                </ButtonContainer>
                                
                            </AddToCartContainer>
                        </Grid>
                    </Grid>
            }
        </Container>
    )
};

export default Product
