import React, { useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import Product from '../../components/Product';
import Loader from '../../components/Loader/Loader';
import {fetchProductsList} from '../../actions/productActions';
import { Alert } from '@material-ui/lab';


function HomePage(props) {

    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList)
    const{loading, error, products} = productList

    useEffect(()=>{

        dispatch(fetchProductsList());
    
    }, [dispatch])

    return (
        <div className='home-page'>
            <h1>Latest Products</h1>
            {loading ? <Loader /> : 
                error ? <Alert severity="error">{error}</Alert>:
                    <Grid container spacing={2} >
                        {products.map( product => (
                            <Product key={product._id}product={product}/>
                        ))}
                    </Grid>
            }
        </div>
    )
};

export default HomePage;
