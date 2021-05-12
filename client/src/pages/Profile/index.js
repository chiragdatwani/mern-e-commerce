import React, { useState, useEffect } from 'react';
import { Alert } from '@material-ui/lab';
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../../actions/userActions'
import { FormContainer, StyledTableRow } from './Profile.elements'
import { Grid } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { getMyOrders } from '../../actions/orderActions';
import Loader from '../../components/Loader/Loader';
import Meta from '../../components/Meta';

const ProfilePage = ({location, history}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [message, setMessage] = useState(null);


    const dispatch = useDispatch();
    
    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user } = userDetails;

    const currentUser = useSelector(state => state.currentUser);
    const { userInfo } = currentUser;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);

    const { success } = userUpdateProfile;

    const myOrders = useSelector(state => state.myOrders);

    const { loading:ordersLoading, orders, error:ordersError } = myOrders;

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
            if(!user || !user.hasOwnProperty('name')){
                dispatch(getUserDetails('profile'))
                dispatch(getMyOrders());
            } else {
                setName(user.name);
                setEmail(user.email);
                document.title = user.name;
            }

        }
    }, [history, userInfo, user, dispatch])
    return (
        <div className='profile-page'>
            <Meta title={`${name} | Book Attic`} />
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
                        <Button type='submit' color='primary' variant='contained'>Update Profile</Button>
                        </form>
                        </FormContainer>
                    </Grid>

                    <Grid item md={9} xs={12} >
                        <h2 style={{marginBottom: '30px'}}>Your Orders</h2>
                        { ordersLoading? <Loader /> :
                            ordersError ? <Alert severity='error'>{error}</Alert> :
                            orders.length === 0 ? <Alert severity='info'>You have no orders</Alert> :

                        <TableContainer component={Paper}>
                            <Table>
                            <TableHead fullWidth>
                                <TableRow>
                                    <TableCell component="th" scope="row">ID</TableCell>
                                    <TableCell align='right'>Date</TableCell>
                                    <TableCell align='right'>Total</TableCell>
                                    <TableCell align='right'>Items</TableCell>
                                    <TableCell align='right'>Paid</TableCell>
                                    <TableCell align='right'>Delivered</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map( order => (
                                    <StyledTableRow 
                                        key={order._id}
                                        onClick={()=>{history.push(`/order/${order._id}`)}}
                                    >
                                        <TableCell>{order._id}</TableCell>
                                        <TableCell align='right'>{order.createdAt.slice(0,10)}</TableCell>
                                        <TableCell align='right'>${order.totalPrice}</TableCell>
                                        <TableCell align='right'>{order.orderItems.reduce((total, item) => (total+item.qty), 0)}</TableCell>
                                        <TableCell align='right'>{order.isPaid ? <p style={{color:`green`}}>{order.paidAt.slice(0,10)}</p> : <ClearIcon style={{color:'red'}}/> }</TableCell>
                                        <TableCell align='right'>{order.isDelivered ? <p style={{color:`green`}}>{order.deliveredAt.slice(0,10)}</p> : <ClearIcon style={{color:'red'}}/>}</TableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </TableContainer>
                        }
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default ProfilePage
