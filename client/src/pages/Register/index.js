import { Button, Container, Paper, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../../actions/userActions'
import { FormContainer, RegisterContainer, ImgContainer } from './Register.elements';
import { TweenMax, Power3 } from 'gsap';
import Meta from '../../components/Meta';

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

    //refs for GSAP
    let formRef = useRef(null);
    let imgRef = useRef(null);

    useEffect(() => {

        TweenMax.from(formRef, 1 , {opacity: 0, y: 30, ease: Power3.easeOut});
        TweenMax.from(imgRef, 1 , {opacity: 0, x: 50, ease: Power3.easeOut, delay: 0.2});
        if(userInfo){
            history.push(redirect) 
        }
    }, [history, userInfo, redirect])

    return (
        <div className='login-page'>
            <Meta title="Join Now | Book Attic" />
            <Container maxWidth={'lg'}>
                <RegisterContainer>
            <FormContainer component={Paper} justify='left' maxWidth='xs' ref={ el => formRef = el}>
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
                        <img ref={ el => imgRef = el} src={process.env.PUBLIC_URL + '/icons/illustration2.jpg'} alt="img" />
                    </ImgContainer>
            </RegisterContainer>
            </Container>
        </div>
    )
}

export default RegisterPage
