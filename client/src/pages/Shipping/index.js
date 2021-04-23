import React, { useState } from 'react';
import { Paper, TextField } from '@material-ui/core';
import { FormContainer, StyledButton } from './Shipping.elements';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../actions/cartActions';
import Stepper from '../../components/StepperNav'
import StepperNav from '../../components/StepperNav';


const ShippingPage = ({ history }) => {

    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalcode, setPostalcode] = useState(shippingAddress.postalcode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalcode, country }));
        history.push('/payments')
    }
    return (
        <div className='shipping-page'>
            <StepperNav stepNumber={1}/>
            <FormContainer component={Paper} justify='left' maxWidth='xs'>
                <h1>SHIPPING</h1>
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
                value={postalcode}
                onChange={(e)=>setPostalcode(e.target.value)}/>
                <TextField 
                required
                margin='dense'
                variant='outlined'
                fullWidth
                label="Country"
                value={country}
                onChange={(e)=>setCountry(e.target.value)}/>
                <StyledButton type='submit'>Continue</StyledButton>
                </form>

            </FormContainer>
        </div>
    )
}

export default ShippingPage
