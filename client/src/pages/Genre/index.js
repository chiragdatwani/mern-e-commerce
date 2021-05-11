import { Container, Grid } from '@material-ui/core'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader/Loader';
import Product from '../../components/Product';

const GenrePage = ({match}) => {

    const genre = match.params.genre
    const [ products, setProducts ] = useState([]);
    const [ loading, setLoading ] = useState(true)

    useEffect(()=>{
        const fetchProducts = async() => {
            const {data} = await axios.get(`/api/products/genre/${genre}`);
            setProducts(data);
            setLoading(false);
        };
        fetchProducts()
    }, [match])
    return (
        <div>
        <div className={`genre-page ${genre}-page`}>
            <Container maxWidth={'lg'}>
            <h1 style={{color: 'white'}}>RANDOM QUOTE</h1>
            </Container>
            <div className="back-blur-genre"></div>
            <div>
                
            </div>
        </div>
        <Container maxWidth={'lg'}>

                
                <h2>{`Top ${genre.split('-').map(e => (e.charAt(0).toUpperCase() + e.slice(1))).join(' ')} Books`}</h2>
                {loading ? <Loader /> : (

                    <Grid container spacing={3} justify={'flex-start'} alignContent={'center'} alignItems={'center'}>
                    {products.map( product => (
                        <Product key={product._id}product={product}/>
                    ))}
                    </Grid>
                )}

                </Container>
        </div>
    )
}

export default GenrePage
