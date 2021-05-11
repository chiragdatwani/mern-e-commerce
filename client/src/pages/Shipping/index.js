import React, { useState } from 'react';
import { Button, Container, Paper, TextField } from '@material-ui/core';
import { FormContainer } from './Shipping.elements';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../actions/cartActions';
import StepperNav from '../../components/StepperNav';


const ShippingPage = ({ history }) => {

    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        history.push('/payment')
    }
    return (
        <div className='shipping-page'>
            <Container maxWidth={'lg'}>
                <StepperNav stepNumber={1}/>
                <FormContainer component={Paper} justify='left' maxWidth='xs'>
                    <h2>SHIPPING</h2>
                    <form onSubmit={submitHandler}>
                    <TextField
                    required
                    variant='outlined'
                    margin='dense'
                    fullWidth 
                    label="Address"
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}/>
                    <TextField 
                    required
                    margin='dense'
                    variant='outlined'
                    fullWidth
                    label="City"
                    value={city}
                    onChange={(e)=>setCity(e.target.value)}/>
                    <TextField 
                    required
                    margin='dense'
                    variant='outlined'
                    fullWidth
                    label="Postal Code"
                    value={postalCode}
                    onChange={(e)=>setPostalCode(e.target.value)}/>
                    <TextField 
                    required
                    margin='dense'
                    style={{marginBottom: '15px'}}
                    variant='outlined'
                    fullWidth
                    label="Country"
                    value={country}
                    onChange={(e)=>setCountry(e.target.value)}/>
                    <Button variant='contained' color='primary' type='submit'>Continue</Button>
                    </form>
                </FormContainer>
            </Container>
        </div>
    )
}

export default ShippingPage
