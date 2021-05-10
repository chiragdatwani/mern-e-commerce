import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchProduct, createProductReview} from '../../actions/productActions'
import {Button, Divider, FormControl, Grid, InputLabel, MenuItem, Modal, Paper, Select, TextField } from '@material-ui/core'
import { InfoContainer, AddToCartContainer, StyledContainer, ButtonContainer, ReviewContainer, ModalBody, ImgAndInfo, RatingContainer, DescriptionContainer } from './Product.elements';
import Loader from '../../components/Loader/Loader'
import { Alert, Rating } from '@material-ui/lab';
import types from '../../actions/types';


function Product({match, history}) {

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [ratingValue, setRatingValue] = useState(3);
    const [reviewValue, setReviewValue ] = useState('');

    const dispatch = useDispatch();

    const currentProduct = useSelector(state => state.currentProduct);
    const {product, loading, error} = currentProduct;

    const currentUser = useSelector(state => state.currentUser);
    const {userInfo} = currentUser;

    const productReviewCreate = useSelector(state => state.productReviewCreate);
    const { success:successReview, error:errorReview} = productReviewCreate;

    useEffect(()=>{
        if(successReview){
            alert('Thanks for your review');
            setRatingValue(3);
            setReviewValue('');
            dispatch({type: types.PRODUCT_CREATE_REVIEW_RESET })
            setOpen(false)
        }

        dispatch(fetchProduct(match.params.id))
        
    }, [dispatch, match, successReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${quantity}`)
    }

    const submitReviewHandler = () => {

        dispatch(createProductReview(match.params.id, { rating: ratingValue, comment: reviewValue }))

    }

    //to control the add-review modal
    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <StyledContainer maxWidth={'lg'} >
            {loading ? <Loader /> :
                error ? <Alert severity="error">{error}</Alert> :
                    <Grid container justify='space-between' spacing={3}>
                        <Grid item md={7} sm={7} xs={12} style={{backgroundColor:'#f9f9f9f9'}}>
                            <ImgAndInfo>
                            <img src={product.image} alt={product.name} />
                            <InfoContainer component='div'>
                            <h2>{product.name}</h2>
                            <p>Author: <strong>{product.author}</strong></p>
                            <Divider/>
                            
                            <p>Genre: <strong>{product.category && product.category.charAt(0).toUpperCase() + product.category.slice(1)}</strong></p>
                            <Divider />
                            <p>Publication: <strong>{product.publication}</strong></p>
                            <Divider />
                            <RatingContainer>
                            <Rating name="read-only" value={product.rating} readOnly /><span className='num-review'>{`from ${product.numReviews} review`}</span>
                            </RatingContainer>
                            </InfoContainer>
                            </ImgAndInfo>

                            <DescriptionContainer>
                                <p>{product.description}</p>
                            </DescriptionContainer>
                            
                            
                        </Grid>
                        {/* <Grid item md={5} sm={6}>
                            
                        </Grid> */}

                        <Grid item md={3} sm={5} xs={12} >
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
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        disabled={product.countInStock ? false:true} 
                                        onClick={()=>{addToCartHandler()}}
                                    >
                                    Add To Cart
                                    </Button>
                                </ButtonContainer>
                                
                            </AddToCartContainer>
                        </Grid>
                        <Grid item sm={4} xs={12}>
                                <h2>Reviews</h2>
                                {product.reviews.length === 0 && <Alert
                                 severity='info'>No Reviews</Alert>}
                                {product.reviews.map( review => (
                                    <ReviewContainer key={review._id}>
                                        <h4>{review.name}</h4>
                                        
                                        <Rating 
                                            value={review.rating}
                                            readOnly
                                        />
                                    
                                        <h5>{`"${review.comment}"`}</h5>
                                    </ReviewContainer>
                                ))}
                                {userInfo && (
                                    <div style={{marginTop:'12px'}}>
                                    <Button
                                        variant='contained'
                                        color='primary' 
                                        onClick={handleOpen}
                                    >
                                        Submit a review
                                    </Button>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                    >
                                        <ModalBody component={Paper}>
                                        <h3>Write a review</h3>
                                        {errorReview && <Alert severity='error'>{errorReview}</Alert> }
                                        {successReview && <Alert severity='success'>Thanks for your review</Alert>}
                                        <Rating
                                            value={ratingValue}
                                            onChange={(e, newValue) => setRatingValue(newValue)}
                                        />
                                        <TextField 
                                            id="review-input"
                                            label="Review"
                                            multiline
                                            fullWidth
                                            rows={3}
                                            placeholder="Write your review here"
                                            value={reviewValue}
                                            onChange={ e => setReviewValue(e.target.value) }
                                            variant="outlined"
                                        />
                                        <Button 
                                            variant='contained'
                                            color='primary'
                                            onClick={submitReviewHandler}
                                        >
                                            Submit
                                        </Button>
                                        </ModalBody>
                                        
                                    </Modal>
                                    </div>
                                )}

                        </Grid>
                    </Grid>
            }
        </StyledContainer>
    )
};

export default Product
