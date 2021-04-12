import React from 'react'
import {Container} from './Stars.elements';
import {Rating} from '@material-ui/lab'

function Stars(props) {
    return (
        <Container>
            <Rating name="read-only" value={props.rating} readOnly />
            <p className='rating-text'>{props.text}</p>
        </Container>
    )
}

export default Stars
