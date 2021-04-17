import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import {fetchProduct} from '../../actions/productActions'
import {Divider, FormControl, Grid, InputLabel, MenuItem, NativeSelect, Select} from '@material-ui/core'
import Stars from '../../components/Stars';
import { InfoContainer, Container, AddToCartContainer, StyledButton, ButtonContainer } from './Product.elements';
import Loader from '../../components/Loader/Loader'
import { Alert } from '@material-ui/lab';


function Product(props) {

    const [quantity, setQuantity] = useState(0);

    const dispatch = useDispatch();

    const currentProduct = useSelector(state => state.currentProduct);

    const {product, loading, error} = currentProduct;

    useEffect(()=>{

        // const fetchProduct = async() => {
        //     const {data} = await axios.get(`/api/products/${props.match.params.id}`);
        //     setIsLoading(false)
        //     setProduct(data);
        // };
        dispatch(fetchProduct(props.match.params.id))
        // fetchProduct();
        
    }, [dispatch])
 
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
                                        <option value="" disabled>Quantity</option>
          
                                        {[...Array(product.countInStock).keys()].map(x => (
                                            <option key={x+1} value={x+1}>{x + 1}</option>
                                        ))}
                                    </Select>
                                    </FormControl>
                                }
                                
                                <ButtonContainer>
                                
                                <StyledButton variant='contained' disabled={product.countInStock ? false:true} >Add To Cart</StyledButton>
                                </ButtonContainer>
                                
                            </AddToCartContainer>
                        </Grid>
                    </Grid>
            }
        </Container>
    )
};

export default Product
