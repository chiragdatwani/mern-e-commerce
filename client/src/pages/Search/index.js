import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import Product from '../../components/Product';

const SearchPage = ({match}) => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchProducts = async() => {
            const { data } = await axios.get(`/api/products/search/${match.params.keyword}`)
            setProducts(data);
            setLoading(false);
        }
        fetchProducts();
    },[match])

    return (
        <div className='search-page'>
            <Container maxWidth={'lg'}>
                <h2 style={{margin: '40px 0 50px 0'}}>{`Search results for: ${match.params.keyword}`}</h2>
                {loading ? <Loader /> : products && products.length == 0 ? <Alert severity='error'>{`Can't find any related books`}</Alert> : (
                    <Grid container spacing={3} justify={'center'} alignContent={'center'} alignItems={'center'}>
                        {products.map( product => (
                            <Product key={product._id}product={product}/>
                        ))}
                    </Grid>
                )}
            </Container>
        </div>
    )
}

export default SearchPage
