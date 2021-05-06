import { Container } from '@material-ui/core'
import React from 'react'
import ProductCarousel from '../ProductsCarousel'
import { Heading, Main } from './HomeMain'

const HomeMain = () => {
    return (
        <div className='home-main'>
            <Container maxWidth={'lg'}>
                <Main>
                    <Heading>
                        Lose yourself between the lines.
                        Choose from a wide range of books.
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
