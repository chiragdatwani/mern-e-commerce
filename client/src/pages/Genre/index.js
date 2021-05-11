import { Container, Grid } from '@material-ui/core'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader/Loader';
import Product from '../../components/Product';
import QuoteGenerator from '../../components/QuoteGenerator';

const GenrePage = ({match}) => {

    const genre = match.params.genre
    
    const [ products, setProducts ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(()=>{
        const fetchProducts = async() => {
            const {data} = await axios.get(`/api/products/genre/${genre}`);
            setProducts(data);
            setLoading(false);
        };
        fetchProducts()
    }, [match, genre])

    return (
        <div>
            <div className={`genre-page ${genre}-page`}>
                <Container maxWidth={'lg'}>
                    <QuoteGenerator genre={genre.split('-').join('')}/>
                </Container>
                <div className="back-blur-genre"></div>
            </div>
            <Container maxWidth={'lg'}>
                    <h2 style={{margin: '50px 0 40px 0'}}>{`Top ${genre.split('-').map(e => (e.charAt(0).toUpperCase() + e.slice(1))).join(' ')} Books`}</h2>
                    {loading ? <Loader /> : (
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

export default GenrePage;
