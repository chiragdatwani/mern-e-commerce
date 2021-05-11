import React, { useEffect, useRef } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { Container, Grid } from '@material-ui/core';
import Product from '../../components/Product';
import Loader from '../../components/Loader/Loader';
import {fetchProductsList} from '../../actions/productActions';
import { Alert, Pagination } from '@material-ui/lab';
import { PaginationContainer, TopRated } from './Home.elements';
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

    const GridRef = useRef(null)

    return (
        <div className='home-page'>
            <HomeMain />
            <Container maxWidth={'lg'}>
                <GenreSelector />
                <TopRated>
                    <h1>Top Rated Books</h1>
                    {loading ? <div style={{height:GridRef.current.offsetHeight + 60, width:GridRef.current.offsetWidth, display: 'grid', placeItems: 'center'}}> <Loader /> </div> : 
                        error ? <Alert severity="error">{error}</Alert>:
                        <>
                            <Grid ref={GridRef} container spacing={3} justify={'center'} alignContent={'center'} alignItems={'center'}>
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
                </TopRated>
            </Container>
        </div>
    )
};

export default HomePage;
