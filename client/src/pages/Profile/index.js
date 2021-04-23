import React, { useState, useEffect } from 'react';
import { Alert } from '@material-ui/lab';
import { Paper, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../../actions/userActions'
import { FormContainer, StyledButton } from './Profile.elements'
import { Container, Grid } from '@material-ui/core';

const ProfilePage = ({location, history}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [message, setMessage] = useState(null)
    const redirect = location.search ? location.search.split('=')[1] : '/';

    const dispatch = useDispatch();
    
    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user } = userDetails;

    const currentUser = useSelector(state => state.currentUser);
    const { userInfo } = currentUser;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);

    const { success } = userUpdateProfile;

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
        
    }
    
    useEffect(() => { 
        if(!userInfo){
            history.push('/login') 
        }else{
            if(!user.hasOwnProperty('name')){
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name);
                setEmail(user.email)
            }

        }
    }, [history, userInfo, user, dispatch])
    return (
        <div className='profile-page '>
            <Container maxWidth={'lg'}>
                <Grid container spacing={3}>
                    <Grid item md={3} xs={12}>
                        <h2>Profile</h2>
                        <FormContainer component={Paper} justify='left' maxWidth='xs'>
                        {message && <Alert severity='error'>{message}</Alert>}
                        {success && <Alert severity='success'>{'Profile Updated'}</Alert>}
                        {error && <Alert severity='error'>{error}</Alert>}
                        {loading && <Alert severity='info'>{'Updating...'}</Alert>}
                        <form onSubmit={submitHandler}>
                        <TextField 
                            required 
                            margin='dense'
                            fullWidth label="Name" 
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                        <TextField 
                            required
                            margin='dense' 
                            type='email' 
                            fullWidth 
                            label="Email" 
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                        <TextField 
                            type='password' 
                            fullWidth 
                            margin='dense'
                            label="Password" 
                            value={password} 
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        <TextField  
                            type='password' 
                            fullWidth
                            margin='dense'
                            label="Confirm Password" 
                            value={confirmPassword} 
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                        />
                        <StyledButton type='submit'>Update Profile</StyledButton>
                        </form>
                        </FormContainer>
                    </Grid>

                    <Grid item md={9} xs={12}>
                        <h2>Your Orders</h2>
                    </Grid>


                </Grid>
            </Container>
        </div>
    )
}

export default ProfilePage
