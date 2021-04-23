import React, { useState } from 'react';
import { FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup } from '@material-ui/core';
import { FormContainer, StyledButton } from './Payment.elements';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../../actions/cartActions';
import StepperNav from '../../components/StepperNav';


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
            <StepperNav stepNumber={2}/>
            <FormContainer component={Paper} justify='left' maxWidth='xs'>
                <h2>PAYMENT METHOD</h2>
                <form onSubmit={submitHandler}>
                    <FormControl component='fieldset'>
                        <RadioGroup value={paymentMethod} onChange={ e => setPaymentMethod(e.target.value)}>
                            <FormControlLabel value='PayPal' control={<Radio/>} label='PayPal or Credit Card'/>
                            <FormControlLabel value='cod' control={<Radio/>} label='Cash on delivery'/>
                        </RadioGroup>
                    </FormControl>
                <StyledButton type='submit'>Continue</StyledButton>
                </form>

            </FormContainer>
        </div>
    )
}

export default PaymentPage;
