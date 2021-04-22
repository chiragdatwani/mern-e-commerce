import { Container } from '@material-ui/core';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const FormContainer = styled(Container)`
    margin-top: 30px;
    padding: 20px;
    & > h1 {
        margin-top: 0;
    }

`

export const StyledButton = styled(Button)`
    margin-top: 25px;
    width: 100%;
    background-color: black;
    color: white;
    & :hover{
        color: black;
        font-weight: bold;
    }

`