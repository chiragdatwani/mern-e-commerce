import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchProduct, createProductReview} from '../../actions/productActions'
import {Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select} from '@material-ui/core'
import Stars from '../../components/Stars';
import { InfoContainer, Container, AddToCartContainer, StyledButton, ButtonContainer, ReviewContainer } from './Product.elements';
import Loader from '../../components/Loader/Loader'
import { Alert, Rating } from '@material-ui/lab';


function Product({match, history}) {

    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    const currentProduct = useSelector(state => state.currentProduct);
    const {product, loading, error} = currentProduct;

    const currentUser = useSelector(state => state.currentUser);
    const {userInfo} = currentUser;

    const productReviewCreate = useSelector(state => state.productReviewCreate);
    const {loading:loadingReview, success:successReview, error:errorReview} = productReviewCreate;

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
                        <Grid item md={5} xs={12} >
                            
                            <img  style={{width: '100%', height: 'auto'}} src={product.image} alt={product.name} />
                            
                        </Grid>
                        <Grid item md={4} sm={6}>
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
                            <AddToCartContainer component={Paper}>
                                <h3>{`Price: $${product.price}`}</h3>
                                <Divider />
                                <h3>{`Status: ${product.countInStock ? 'In Stock': 'Out of stock'}`}</h3>
                                <Divider />
                                {
                                    product.countInStock > 0 &&
                                    <FormControl>
                                    <InputLabel htmlFor='qty'>Quantity</InputLabel>
                                    <Select
                                        defaultValue={quantity}
                                        value={quantity}
                                        onChange={e => setQuantity(e.target.value)}
                                        
                                        inputProps={{ 
                                            name: 'quantity',
                                            id: 'qty'
                                         }}
                                    > 
                                        <MenuItem value="" disabled>Quantity</MenuItem>
          
                                        {[...Array(product.countInStock).keys()].map(x => (
                                            <MenuItem key={x+1} value={x+1}>{x + 1}</MenuItem>
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
                        <Grid item sm={4} xs={12}>
                                <h2>Reviews</h2>
                                {product.reviews.length === 0 && <Alert severity='info'>No Reviews</Alert>}
                                {product.reviews.map( review => (
                                    <ReviewContainer>
                                        <h4>{review.name}</h4>
                                        
                                        <Rating 
                                            value={review.rating}
                                            readOnly
                                        />
                                    
                                        <h5>{`"${review.comment}"`}</h5>
                                    </ReviewContainer>
                                ))}

                        </Grid>
                    </Grid>
            }
        </Container>
    )
};

export default Product
