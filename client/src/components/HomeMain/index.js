import { Container } from '@material-ui/core'
import React, { useEffect, useRef } from 'react'
import ProductCarousel from '../ProductsCarousel'
import { Heading, Main } from './HomeMain'
import {TweenMax, Power3} from 'gsap';

const HomeMain = () => {

    let headingRef = useRef(null);

    useEffect(() => {
        TweenMax.from(headingRef, 1.2, {opacity: 0, y: 100, ease: Power3.easeOut, delay: 0.5})
    }, [])
    return (
        <div className='home-main'>
            <Container maxWidth={'lg'}>
                <Main ref={el => headingRef = el}>
                    <Heading >
                        Lose yourself between the lines!
                        Select from a wide range of books.
                    </Heading>
                    
                    <div>
                        <ProductCarousel />
                    </div>
                </Main>
            </Container>
            <div className="back-blur"></div>
        </div>
    )
}

export default HomeMain
