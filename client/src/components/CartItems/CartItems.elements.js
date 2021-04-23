import {TableContainer } from '@material-ui/core';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const StyledLink = styled(Link)`
        color: inherit;
        text-decoration: none;
`

export const StyledTable = styled(TableContainer)`

    @media (max-width: 768px){
        & .MuiTableCell-root{
            padding: 10px;
        }
    }

    @media (max-width: 450px){
        & .MuiTableCell-root{
            padding: 10px;
        }

        & h3{
            font-size: 10px;
            font-weight: bolder;
        }
        & img {
            width: 50px;
        }
        & p {
            font-size: 12px
        }

    }

    & svg{
        & :hover{
            cursor: pointer;
        }
    }
`

export const Image = styled.img`
    width: 80px;
    height: auto;
`

export const StyledOption = styled.option`
    cursor: pointer;
    & :hover{
        background-color: gray !important
    }
`