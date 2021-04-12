import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import {NavContainer, ButtonContainer} from './Header.elements'
function Header() {
    return (
        <header>
            <AppBar position="static">
                <Toolbar>
                    <NavContainer>
                    <Typography variant="h6" edge='start'>
                    News
                    </Typography>
                    <ButtonContainer>
                        <Button color="inherit">Cart</Button>
                        <Button color="inherit">Login</Button>
                    </ButtonContainer>
                    
                    </NavContainer>
                    
                </Toolbar>
            </AppBar>
        </header>
    )
}

export default Header
