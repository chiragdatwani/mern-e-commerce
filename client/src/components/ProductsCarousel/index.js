import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';

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
        <Carousel animation='slide' >
            {products.length > 0 && (
                products.map( product => (
                    <div key={product._id}>
                        <h3>{product.name}</h3>
                        <button>Buy Now</button>
                    </div>
                ))

            )}
        </Carousel>
    )
}

export default ProductCarousel
