import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Loader from '../../components/Loader/Loader';
import { fetchProductsList, deleteProductAdmin, createProductAdmin } from '../../actions/productActions';
import { Edit, Delete, ButtonContainer } from './ProductList.elements';
import types from '../../actions/types';


const ProductList = ({history}) => {

    const currentUser = useSelector( state => state.currentUser);
    const { userInfo } = currentUser;

    const productList = useSelector( state => state.productList);
    const { products, loading, error } = productList;

    const deleteProduct = useSelector( state => state.deleteProduct);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = deleteProduct;

    const createProduct = useSelector( state => state.createProduct);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = createProduct;

    const dispatch = useDispatch();

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?')){
            dispatch(deleteProductAdmin(id));
        }
    };

    const createProductHandler = () => {
        dispatch(createProductAdmin())
    }

    useEffect(() => {
        document.title = 'Products List';
        dispatch({
            type: types.PRODUCT_CREATE_RESET
        });

        if(!userInfo || !userInfo.isAdmin){
            history.push('/login')
        }
        
        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(fetchProductsList())
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct])

    return (
        <div className='productlist_page'>
            {
            loading ? <Loader /> : error ? <Alert severity='error'>{error}</Alert> : (
                <>
                <h1>Products</h1>
                <ButtonContainer>
                    { loadingCreate ? <CircularProgress /> :
                    <Button 
                        color='primary' 
                        variant='contained'
                        onClick={createProductHandler}
                    >Add Product
                    </Button>
                    }
                </ButtonContainer>
                {errorDelete && <Alert severity='error'>{errorDelete}</Alert>}
                {errorCreate && <Alert severity='error'>{errorCreate}</Alert>}
                <TableContainer component={Paper}>
                            <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell component="th" scope="row"><strong>ID</strong></TableCell>
                                    <TableCell align='right'><strong>NAME</strong></TableCell>
                                    <TableCell align='right'><strong>AUTHOR</strong></TableCell>
                                    <TableCell align='right'><strong>PRICE</strong></TableCell>
                                    <TableCell align='right'><strong>CATEGORY</strong></TableCell>
                                    <TableCell align='right'><strong>STOCK</strong></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map( product => (
                                    <TableRow key={product._id}>
                                        <TableCell>{product._id}</TableCell>
                                        <TableCell align='right'>{product.name}</TableCell>
                                        <TableCell align='right'>{product.author}</TableCell>
                                        <TableCell align='right'>${product.price}</TableCell>
                                        <TableCell align='right'>{product.category}</TableCell>
                                        <TableCell align='right'>{product.countInStock}</TableCell>
                                        <TableCell>
                                            <Button 
                                                onClick={()=>{ history.push(`/admin/product/${product._id}/edit`)}}
                                            >
                                            <Edit />
                                            </Button>
                                            { loadingDelete ? <CircularProgress /> :
                                            <Button onClick={() => deleteHandler(product._id)}>
                                            <Delete />
                                            </Button>
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </TableContainer>
                </>
            )
            }
        </div>
    )
}

export default ProductList;
