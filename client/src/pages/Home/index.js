import React, { useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { Container, Grid } from '@material-ui/core';
import Product from '../../components/Product';
import Loader from '../../components/Loader/Loader';
import {fetchProductsList} from '../../actions/productActions';
import { Alert, Pagination } from '@material-ui/lab';
import { PaginationContainer } from './Home.elements';
import HomeMain from '../../components/HomeMain';
import GenreSelector from '../../components/GenreSelector';



function HomePage({match, history}) {

    const pageNumber = Number(match.params.page) || 1;

    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList)
    const{loading, error, products, page, totalPages} = productList

    useEffect(()=>{

        dispatch(fetchProductsList(pageNumber));
    
    }, [dispatch, pageNumber])

    const handlePagination = (e, v) => {
        history.push(`/page/${v}`)
    }

    return (
        <div className='home-page'>
            <HomeMain />
            <Container maxWidth={'lg'}>
            <GenreSelector />
            <h1>Latest Products</h1>
            {loading ? <Loader /> : 
                error ? <Alert severity="error">{error}</Alert>:
                <>
                    <Grid container spacing={3} >
                        {products.map( product => (
                            <Product key={product._id}product={product}/>
                        ))}
                    </Grid>
                    <PaginationContainer>
                        <Pagination 
                        count={totalPages} 
                        page={page} 
                        onChange={handlePagination}
                        size='large'
                        color='primary'
                        />
                    </PaginationContainer>
                    
                </>
            }
            </Container>
            
        </div>
    )
};

export default HomePage;
