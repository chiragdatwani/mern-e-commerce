import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { CarouselItem, StyledLink } from './ProductCarousel.elements';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';


const ProductCarousel = () => {

    const [ products, setProducts ] = useState([]);

    useEffect(()=>{

        const fetchProducts = async() => {
            const { data } = await axios.get('/api/products/top');
            setProducts(data)
        }

        fetchProducts();

    },[products])

    return (
        <Carousel 
            animation='fade'
            NextIcon={<ArrowForwardIosRoundedIcon />}
            PrevIcon={<ArrowBackIosRoundedIcon />}
            navButtonsProps={{
                style: {
                    backgroundColor: 'cornflowerblue',
                    borderRadius: '50%'
                }
            }}
            indicatorIconButtonProps={{
                style: {
                    padding: '10px',    // 1
                    color: 'white'       // 3
                }
            }}
            activeIndicatorIconButtonProps={{
                style: {
                    transition: 'all .3s ease-out',
                    transform: 'scale(1.5)'
                }
            }}
        
            >
            {products.length > 0 && (
                products.map( product => (
                    <CarouselItem elevation={3} key={product._id}>
                        <div className="carousel-img" >
                            <img src={product.image} alt={product.name}></img>
                        </div> 
                        <div className="info">
                            <div className="name">
                                <h3>{product.name}</h3>
                                <p>{`by ${product.author}`}</p>
                            </div>
                            <div className="buy">
                                <StyledLink to={`/product/${product._id}`}>
                                <button>Buy Now <ArrowForwardIosRoundedIcon /> </button>
                                </StyledLink>
                            </div>
                        </div>
                    </CarouselItem>
                ))
            )}
        </Carousel>
    )
}


export default ProductCarousel
