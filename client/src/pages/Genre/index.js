import { Container, Grid } from '@material-ui/core'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Loader from '../../components/Loader/Loader';
import Product from '../../components/Product';
import QuoteGenerator from '../../components/QuoteGenerator';
import Meta from '../../components/Meta';
import {gsap, TweenMax, Power3} from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const GenrePage = ({match}) => {

    const genre = match.params.genre
    
    const [ products, setProducts ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    let quoteRef = useRef(null);
    let prodsRef = useRef(null);


    useEffect(()=>{
        TweenMax.to(window, 0.3, {scrollTo: 0, ease: Power3.easeOut});
        TweenMax.from(quoteRef, 1.5, {opacity: 0, y:40, ease: Power3.easeOut})
        TweenMax.from(prodsRef, 1.5, {opacity: 0, y:40, ease: Power3.easeOut, delay: 0.5})
        const fetchProducts = async() => {
            const {data} = await axios.get(`/api/products/genre/${genre}`);
            setProducts(data);
            setLoading(false);
        };
        fetchProducts()
    }, [match, genre])

    return (
        <div style={{marginBottom: '30px'}}>
            <Meta title={`${genre.split('-').map(e => (e.charAt(0).toUpperCase() + e.slice(1))).join(' ')} Books | Book Attic`} />
            <div className={`genre-page ${genre}-page`} >
                <Container maxWidth={'lg'} ref={el => quoteRef = el}>
                    <QuoteGenerator genre={genre.split('-').join('')}/>
                </Container>
                <div className="back-blur-genre" ></div>
            </div>
            <Container maxWidth={'lg'} ref={el => prodsRef = el}>
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
