import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserList } from '../../actions/userActions';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import Loader from '../../components/Loader/Loader';

const UserList = () => {

    const userList = useSelector( state => state.userList);
    const { users, loading, error } = userList;

    const dispatch = useDispatch();

    const deleteHandler = () => {
        console.log('delete user');
    }

    useEffect(() => {
        dispatch(getUserList())
    }, [dispatch])

    return (
        <div className='userlist_page'>
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
                                        <TableCell align='right'><DeleteIcon onClick={deleteHandler}/></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </TableContainer>
                    </>

            )
            }
        </div>
    )
}

export default UserList
