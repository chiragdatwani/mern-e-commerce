import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import {NavContainer, ButtonContainer, StyledLink} from './Header.elements'

function Header() {
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
                        <StyledLink to='/login'>
                            <Button color="inherit">
                                <PersonIcon />Login
                            </Button>
                        </StyledLink>
                    </ButtonContainer>
                    
                    </NavContainer>
                    
                </Toolbar>
            </AppBar>
        </header>
    )
}

export default Header
