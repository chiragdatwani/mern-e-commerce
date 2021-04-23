import { Paper, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../actions/userActions'
import { FormContainer, StyledButton } from './Login.elements'

const LoginPage = ({location, history}) => {

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const dispatch = useDispatch();
    
    const currentUser = useSelector(state => state.currentUser);
    const {loading, error, userInfo } = currentUser;


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }
 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if(userInfo){
            history.push(redirect) 
        }
    }, [history, userInfo, redirect])

    return (
        <div className='login-page'>
            <FormContainer component={Paper} justify='left' maxWidth='xs'>
                <h1>Sign In</h1>
                {error && <Alert severity='error'>{error}</Alert>}
                {loading && <Alert severity='info'>{error}</Alert>}
                <form onSubmit={submitHandler}>
                <TextField required
                variant='outlined'
                margin='dense' type='email' fullWidth label="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <TextField required
                margin='dense'
                variant='outlined'
                type='password' fullWidth label="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <StyledButton type='submit'>Sign In</StyledButton>
                </form>

                <p>New Customer? <Link to={redirect? `/register?redirect=${redirect}`:'/redirect'}  style={{textDecoration:'none'}}>Register Here</Link></p>
            </FormContainer>
            
        </div>
    )
}

export default LoginPage
