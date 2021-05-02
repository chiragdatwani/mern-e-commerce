import React, { useState, useEffect } from 'react';
import { Alert } from '@material-ui/lab';
import { Paper, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, updateProductAdmin } from '../../actions/productActions'
import { FormContainer, StyledButton, StyledLink } from './ProductEdit.elements'
import types from '../../actions/types';

const ProductEdit = ({match, history}) => {

    const productId = match.params.id;
 
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [countInStock, setCountInStock] = useState(0); 

    


    const dispatch = useDispatch();
    
    const currentProduct = useSelector(state => state.currentProduct);
    const {loading, error, product } = currentProduct;

    const currentUser = useSelector(state => state.currentUser);
    const { userInfo } = currentUser;

    const updateProduct = useSelector(state => state.updateProduct);
    const { error: updateError, success: updateSuccess } = updateProduct;


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProductAdmin({
            _id: productId,
            name,
            price,
            image,
            brand,
            countInStock,
            category,
            description
        }))
    }
    
    useEffect(() => { 
        if(!userInfo){
            history.push('/login') 
        }else{
            if(updateSuccess){
                dispatch({type: types.PRODUCT_UPDATE_RESET});
                history.push('/admin/productList')
            }else{
                if(!product.name || product._id !== productId){
                    dispatch(fetchProduct(productId))
                } else {
                    setName(product.name);
                    setPrice(product.price);
                    setImage(product.image);
                    setBrand(product.brand);
                    setCategory(product.category);
                    setCountInStock(product.countInStock);
                    setDescription(product.description);
                }
            }
        }
    }, [history, userInfo, product._id, dispatch,updateSuccess])


    return (
        <div className='productedit-page'>
            <StyledLink to='/admin/productlist'>Go Back</StyledLink>
                {updateError && <Alert severity='error'>{updateError}</Alert>}
                {updateSuccess && <Alert severity='success'>Updated Successfully</Alert>
                }
                <FormContainer component={Paper} justify='left' maxWidth='xs'>
                        <h2>Edit Product</h2>
                        {error && <Alert severity='error'>{error}</Alert>}
                        {loading && <Alert severity='info'>{'Updating...'}</Alert>}
                        <form onSubmit={submitHandler}>
                        <TextField 
                            required 
                            margin='dense'
                            fullWidth label="Name" 
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                        <TextField 
                            required
                            type='number'
                            margin='dense'
                            fullWidth label="Price" 
                            value={price}
                            onChange={(e)=>setPrice(e.target.value)}
                        />
                        <TextField 
                            required 
                            margin='dense'
                            fullWidth label="Image" 
                            value={image}
                            onChange={(e)=>setImage(e.target.value)}
                        />
                        <TextField 
                            required 
                            margin='dense'
                            fullWidth label="Brand" 
                            value={brand}
                            onChange={(e)=>setBrand(e.target.value)}
                        />
                        <TextField 
                            required 
                            margin='dense'
                            fullWidth label="Category" 
                            value={category}
                            onChange={(e)=>setCategory(e.target.value)}
                        />
                        <TextField 
                            required 
                            margin='dense'
                            type='number'
                            fullWidth label="Stock" 
                            value={countInStock}
                            onChange={(e)=>setCountInStock(e.target.value)}
                        />
                        <TextField 
                            required 
                            margin='dense'
                            fullWidth label="Description" 
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                        />
                        <StyledButton type='submit'>Update Product</StyledButton>
                        </form>
                        </FormContainer>
                    
            
        </div>
    )
}

export default ProductEdit;