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
                                <StyledLink to='/profile'>
                                    <MenuItem>Profile</MenuItem>
                                </StyledLink>
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
                    </ButtonContainer>
                    
                    </NavContainer>
                    
                </Toolbar>
            </AppBar>
        </header>
    )
}

export default Header
