import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, getUserList } from '../../actions/userActions';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import Loader from '../../components/Loader/Loader';
import { Delete } from './UserList.elements';
import Meta from '../../components/Meta';

const UserList = ({history}) => {

    const currentUser = useSelector( state => state.currentUser);
    const { userInfo } = currentUser;

    const userList = useSelector( state => state.userList);
    const { users, loading, error } = userList;

    const dispatch = useDispatch();

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure')){
            dispatch(deleteUser(id));
            dispatch(getUserList())
        }
        
    }

    useEffect(() => {
        
        if(userInfo && userInfo.isAdmin){
            dispatch(getUserList())
        }else{
            history.push('/login')
        }
        
    }, [dispatch, history, userInfo])

    return (
        <div className='userlist_page'>
            <Meta title="Users List | Book Attic" />
            <Container maxWidth={'lg'}>
            {
            loading ? <Loader /> : error ? <Alert severity='error'>{error}</Alert> : (
                <>
                <h1>Users</h1>
                <TableContainer component={Paper}>
                            <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell component="th" scope="row">ID</TableCell>
                                    <TableCell align='right'>Name</TableCell>
                                    <TableCell align='right'>Email</TableCell>
                                    <TableCell align='right'>Admin</TableCell>
                                    <TableCell align='right'></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map( user => (
                                    <TableRow key={user._id}>
                                        <TableCell>{user._id}</TableCell>
                                        <TableCell align='right'>{user.name}</TableCell>
                                        <TableCell align='right'><a href={`mailto:${user.email}`}>{user.email}</a></TableCell>
                                        <TableCell align='right'>{user.isAdmin ? <CheckIcon style={{color:`green`}} /> : <ClearIcon style={{color:'red'}}/> }</TableCell>
                                        <TableCell align='right'><Delete onClick={()=> deleteHandler(user._id)}/></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </TableContainer>
                </>
            )
            }
            </Container>
        </div>
    )
}

export default UserList
