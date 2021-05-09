import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {NavContainer, ButtonContainer, StyledLink} from './Header.elements'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import SearchBox from '../SearchBox';

function Header() {

    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.currentUser.userInfo);

    const handleLogout = () => {
        console.log('clicked');
        dispatch(logout());
    }

    //ProfileMenu Toggle
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    
    //AdminMenu Toggle
    const [anchorElAdmin, setAnchorElAdmin] = useState(null);
    const handleAdminMenuOpen = (event) => {
        setAnchorElAdmin(event.currentTarget);
    };
    const handleAdminMenuClose = () => {
        setAnchorElAdmin(null);
    };

    return (
        <header>
            <AppBar position="static" color='primary'>
                <Toolbar>
                    <NavContainer>
                        <Typography variant="h6" >
                            <StyledLink to='/'>
                                <img src={process.env.PUBLIC_URL + '/icon/open-book.png'} alt='logo'
                                />
                            </StyledLink>
                        </Typography>
                        <SearchBox />
                        <ButtonContainer>
                            <StyledLink to='/cart'>
                                <Button color="inherit">
                                    <ShoppingCartIcon /><p className='nav-label'>Cart</p>
                                </Button>
                            </StyledLink>
                            {userInfo ? 
                                <div>
                                <Button color="inherit" onClick={handleMenuOpen}>
                                    <PersonIcon /><p className='nav-label'>{userInfo.name.split(' ')[0]}</p><ArrowDropDownIcon/>
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem onClick={handleMenuClose}>
                                        <StyledLink to='/profile'>Profile</StyledLink>
                                    </MenuItem>
                                    
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                                </div>
                            :
                            <StyledLink to='/login'>
                                <Button color="inherit">
                                    <PersonIcon /><p className='nav-label'>Login</p>
                                </Button>
                            </StyledLink>
                            }
                            {
                                userInfo && userInfo.isAdmin && (
                                <>
                                <Button color="inherit" onClick={handleAdminMenuOpen}>
                                    Admin<ArrowDropDownIcon/>
                                </Button>
                                <Menu
                                    anchorEl={anchorElAdmin}
                                    keepMounted
                                    open={Boolean(anchorElAdmin)}
                                    onClose={handleAdminMenuClose}
                                >
                                    <MenuItem onClick={handleAdminMenuClose}>
                                        <StyledLink to='/admin/userlist'>Users</StyledLink>
                                    </MenuItem>
                                    <MenuItem onClick={handleAdminMenuClose}>
                                        <StyledLink to='/admin/productlist'>Products</StyledLink>
                                    </MenuItem>
                                    <MenuItem onClick={handleAdminMenuClose}>
                                        <StyledLink to='/admin/orderlist'>Orders</StyledLink>
                                    </MenuItem>
                                </Menu>
                                </>
                                )
                            }
                        </ButtonContainer>
                    </NavContainer>
                </Toolbar>
            </AppBar>
        </header>
    )
}

export default Header
