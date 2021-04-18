import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
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
                    <Button variant='outlined'
                        color="inherit">Cart</Button>
                    </StyledLink>
                        
                        <Button variant='outlined'color="inherit">Login</Button>
                    </ButtonContainer>
                    
                    </NavContainer>
                    
                </Toolbar>
            </AppBar>
        </header>
    )
}

export default Header
