import { Button, Container, Paper, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../../actions/userActions'
import { FormContainer, RegisterContainer, ImgContainer } from './Register.elements'

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
            <Container maxWidth={'lg'}>
                <RegisterContainer>
            <FormContainer component={Paper} justify='left' maxWidth='xs'>
                <h2>NEW USER</h2>
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
                <Button color='primary' variant='contained' type='submit'>Sign Up</Button>
                </form>

                <p>Already have an account? <Link to={redirect? `/login?redirect=${redirect}`:'/login'}  style={{textDecoration:'none'}}>Login Here</Link></p>
            </FormContainer>
            <ImgContainer>
                        <img src={process.env.PUBLIC_URL + '/icons/illustration2.jpg'} alt="img" />
                    </ImgContainer>
            </RegisterContainer>
            </Container>
        </div>
    )
}

export default RegisterPage
