import { Button, Container, Paper, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../actions/userActions'
import { FormContainer, ImgContainer, LoginContainer } from './Login.elements'
import { TweenMax, Power3 } from 'gsap';

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

    //refs for GSAP
    let formRef = useRef(null);
    let imgRef = useRef(null);

    useEffect(() => {
        
        TweenMax.from(formRef, 1 , {opacity: 0, y: 30, ease: Power3.easeOut, delay: 0.2});
        TweenMax.from(imgRef, 1 , {opacity: 0, x: 50, ease: Power3.easeOut});

        if(userInfo){
            history.push(redirect) 
        }
    }, [history, userInfo, redirect])

    return (
        <div className='login-page'>
            <Container maxWidth={'lg'}>
                <LoginContainer>
                    <FormContainer component={Paper} justify='left' maxWidth='xs' ref={ el => formRef = el}>
                        <h2>SIGN IN</h2>
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
                        <Button color='primary' variant='contained' type='submit'>Sign In</Button>
                        </form>
                        <p>New Customer? <Link to={redirect? `/register?redirect=${redirect}`:'/redirect'}  style={{textDecoration:'none'}}>Register Here</Link></p>
                    </FormContainer>
                    <ImgContainer>
                        <img ref={ el => imgRef = el} src={process.env.PUBLIC_URL + '/icons/illustration.jpg'} alt="img" />
                    </ImgContainer>
                </LoginContainer>
            </Container>
        </div>
    );
};

export default LoginPage;
