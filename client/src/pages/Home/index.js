import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import Product from '../../components/Product';
import Loader from '../../components/Loader/Loader';
import {fetchProducts} from '../../actions/productActions';
// import products from '../../products'

function HomePage(props) {

    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList)
    const{loading, error, products} = productList

    useEffect(()=>{

        dispatch(fetchProducts());
        if(error){ 
            console.log(props.logerror);
        }
    }, [dispatch])

    return (
        <div className='home-page'>
            {loading ? <Loader /> : 
                error ? <h3>{error}</h3>:
                    <>
                    <h1>Latest Products</h1>
                    <Grid container spacing={2} >
                        {products.map( product => (
                            <Product key={product._id}product={product}/>
                        ))}
                    </Grid>
                    </>
            }
        </div>
    )
}

export default HomePage;
