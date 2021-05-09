import styled from 'styled-components';
import {Link} from 'react-router-dom'
import {Container} from '@material-ui/core'

export const NavContainer = styled(Container)`
    display: flex;
    justify-content: space-between !important;
    align-items: center;
    width: 100%;
    margin-top: 2px;
    color: #ffffff
`

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    
    margin-right: -25px;
    & > *{
        margin-left: 8px;
    }

    @media (max-width: 500px){
        margin-right: -30px;
        padding: 0;

        & .nav-label{
            display:none;
        }

        & > *{
        margin-left: 0px;
        }

        & .MuiButtonBase-root{
            width: 45px;
        }

        /* & button{
        padding: 0px;
        } */
    
    }
`

export const StyledLink = styled(Link)`
    color: inherit;
    text-decoration:none;
    display: flex;
    align-items: center;
    & > img{
        width: 50px;
        margin-top: 10px;
    }
    
    @media (max-width:400px){
        & > img{
        width: 40px;
        margin-left:-12px
    }
    }
`

