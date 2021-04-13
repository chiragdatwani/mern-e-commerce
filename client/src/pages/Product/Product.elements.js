import styled from 'styled-components';
import {List, Button} from '@material-ui/core'

export const InfoContainer = styled(List)`
    width: 100%;
   
`
export const StyledButton = styled(Button)`
    background-color: black;
    color: white;
    text-align: center;

    
`
export const ButtonContainer = styled.div`
    width: 100%;
`

export const Container = styled.div`
    margin-top: 1.5rem;
    
`

export const AddToCartContainer = styled.div`
    width:100%;
    border: 1px solid black;
    border-radius: 3px;
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */

    > * {
        width: 100%;
        margin: 10px auto;
        text-align: center;
    }

`
