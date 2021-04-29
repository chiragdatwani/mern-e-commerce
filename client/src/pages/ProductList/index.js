import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, getUserList } from '../../actions/userActions';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import Loader from '../../components/Loader/Loader';
import { fetchProductsList } from '../../actions/productActions';
import { Edit, Delete, ButtonContainer } from './ProductList.elements';

const ProductList = ({history}) => {

    const currentUser = useSelector( state => state.currentUser);
    const { userInfo } = currentUser;

    const productList = useSelector( state => state.productList);
    const { products, loading, error } = productList;

    const dispatch = useDispatch();

    const deleteHandler = (id) => {
        console.log('delete');
        
    }

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(fetchProductsList())
        }else{
            history.push('/login')
        }
        
    }, [dispatch, history, userInfo])

    return (
        <div className='productlist_page'>
            {
            loading ? <Loader /> : error ? <Alert severity='error'>{error}</Alert> : (
                <>
                <h1>Products</h1>
                <ButtonContainer>
                    <Button color='primary' variant='contained'>Add Product</Button>
                </ButtonContainer>
                
                <TableContainer component={Paper}>
                            <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell component="th" scope="row"><strong>ID</strong></TableCell>
                                    <TableCell align='right'><strong>NAME</strong></TableCell>
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
                                        <TableCell align='right'>${product.price}</TableCell>
                                        <TableCell align='right'>{product.category}</TableCell>
                                        <TableCell align='right'>{product.countInStock}</TableCell>
                                        <TableCell>
                                            <Button>
                                            <Edit />
                                            </Button>
                                            <Button>
                                            <Delete />
                                            </Button>
                                            
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
