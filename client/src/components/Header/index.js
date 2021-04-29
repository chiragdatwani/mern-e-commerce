import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {NavContainer, ButtonContainer, StyledLink} from './Header.elements'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';

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
            <AppBar position="static">
                <Toolbar>
                    <NavContainer>
                        <Typography variant="h6" >
                        <StyledLink to='/'>
                            Store
                        </StyledLink>
                        </Typography>
                        <ButtonContainer>
                            <StyledLink to='/cart'>
                                <Button color="inherit">
                                    <ShoppingCartIcon />Cart
                                </Button>
                            </StyledLink>
                            {userInfo ? 
                                <div>
                                <Button color="inherit" onClick={handleMenuOpen}>
                                    <PersonIcon />{userInfo.name}<ArrowDropDownIcon/>
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem>
                                        <StyledLink to='/profile'>Profile</StyledLink>
                                    </MenuItem>
                                    
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                                </div>
                            :
                            <StyledLink to='/login'>
                                <Button color="inherit">
                                    <PersonIcon />Login
                                </Button>
                            </StyledLink>
                            }
                            {
                                userInfo && userInfo.isAdmin && (
                                    <div>
                                <Button color="inherit" onClick={handleAdminMenuOpen}>
                                    Admin<ArrowDropDownIcon/>
                                </Button>
                                <Menu
                                    anchorEl={anchorElAdmin}
                                    keepMounted
                                    open={Boolean(anchorElAdmin)}
                                    onClose={handleAdminMenuClose}
                                >
                                    <MenuItem>
                                        <StyledLink to='/admin/userlist'>Users</StyledLink>
                                    </MenuItem>
                                    <MenuItem>
                                        <StyledLink to='/admin/productlist'>Products</StyledLink>
                                    </MenuItem>
                                    <MenuItem>
                                        <StyledLink to='/admin/orderlist'>Orders</StyledLink>
                                    </MenuItem>
                                </Menu>
                                </div>
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
