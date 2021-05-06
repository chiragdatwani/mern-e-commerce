import React, { useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import Product from '../../components/Product';
import Loader from '../../components/Loader/Loader';
import {fetchProductsList} from '../../actions/productActions';
import { Alert, Pagination } from '@material-ui/lab';
import { PaginationContainer } from './Home.elements';
import ProductCarousel from '../../components/ProductsCarousel';



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
            <h1 style={{color: '#ffffff'}}>Lose yourself between the lines. Choose from a wide range of books</h1>
            <ProductCarousel />
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
            
        </div>
    )
};

export default HomePage;
