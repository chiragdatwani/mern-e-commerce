import styled from 'styled-components';
import {Link} from 'react-router-dom'
import {Container} from '@material-ui/core'

export const NavContainer = styled(Container)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

export const ButtonContainer = styled(Container)`
    text-align: end;
    margin-right: -25px;
    > *{
        margin-left: 8px;
    }

`
export const StyledLink = styled(Link)`
    color: inherit;
    text-decoration:none;
`

