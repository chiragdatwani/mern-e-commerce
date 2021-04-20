import { Paper, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../../actions/userActions'
import { FormContainer, StyledButton } from './Register.elements'

const RegisterPage = ({location, history}) => {

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const dispatch = useDispatch();
    
    const registeredUser = useSelector(state => state.registeredUser);

    const {loading, error, userInfo } = registeredUser;


    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        } else {
            dispatch(registerUser(name, email, password))
        }
        
    }
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null)

    useEffect(() => {
        if(userInfo){
            history.push(redirect) 
        }
    }, [history, userInfo, redirect])

    return (
        <div className='login-page'>
            <FormContainer component={Paper} justify='left' maxWidth='xs'>
                <h1>Sign Up</h1>
                {message && <Alert severity='error'>{message}</Alert>}
                {error && <Alert severity='error'>{error}</Alert>}
                {loading && <Alert severity='info'>{error}</Alert>}
                <form onSubmit={submitHandler}>
                <TextField 
                    required 
                    id="standard-required" 
                    margin='dense'
                    fullWidth label="Name" 
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
                <TextField 
                    required 
                    id="standard-required" margin='dense' 
                    type='email' 
                    fullWidth 
                    label="Email" 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <TextField 
                    required 
                    id="standard-required" type='password' 
                    fullWidth 
                    margin='dense'
                    label="Password" 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <TextField 
                    required 
                    id="standard-required" type='password' 
                    fullWidth
                    margin='dense'
                    label="Confirm Password" 
                    value={confirmPassword} 
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                />
                <StyledButton type='submit'>Sign In</StyledButton>
                </form>

                <p>Already have an account? <Link to={redirect? `/login?redirect=${redirect}`:'/login'}  style={{textDecoration:'none'}}>Login Here</Link></p>
            </FormContainer>
            
        </div>
    )
}

export default RegisterPage
