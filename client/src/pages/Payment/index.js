import React, { useState } from 'react';
import { Button, Container, FormControl, FormControlLabel, Paper, Radio, RadioGroup } from '@material-ui/core';
import { FormContainer } from './Payment.elements';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../../actions/cartActions';
import StepperNav from '../../components/StepperNav';
import Meta from '../../components/Meta';


const PaymentPage = ({ history }) => {
    
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart

    if(!shippingAddress){
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');
    }

    return (
        <div className='shipping-page'>
            <Meta title="Payment | Book Attic" />
            <Container maxWidth={'lg'} >
            <StepperNav stepNumber={2}/>
            <FormContainer component={Paper} justify='left' maxWidth='xs'>
                <h2>PAYMENT METHOD</h2>
                <form onSubmit={submitHandler}>
                    <FormControl component='fieldset'>
                        <RadioGroup value={paymentMethod} onChange={ e => setPaymentMethod(e.target.value)}>
                            <FormControlLabel value='PayPal' control={<Radio/>} label='PayPal or Credit Card'/>
                        </RadioGroup>
                    </FormControl>
                <Button variant='contained' color='primary' type='submit'>Continue</Button>
                </form>

            </FormContainer>
            </Container>
        </div>
    )
}

export default PaymentPage;
