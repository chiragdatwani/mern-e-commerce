import { List, ListItem } from '@material-ui/core';
import styled from 'styled-components';

export const SearchContainer = styled.div`
    margin: auto;
    width: 40%;
    color: #ffffff;
    & .MuiInputBase-input{
        padding: 9.5px 14px !important;
        color: #ffffff !important;
    }
`

export const MyList = styled(List)`
    
    color: black;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 0;
    box-shadow: 0px 18px 23px 1px rgba(0,0,0,0.55); 
    
`
  
export const MyListItem = styled(ListItem)`
    & :hover{
      background: '#f5f5f5f5'
    }
`

export const SearchList = styled.div`

    position: absolute;
    margin-top: 5px;
    width: 36%;
    z-index: 111;
    
    @media (max-width: 500px){
        width: 50%
    }
`

export const StyledInput = styled.input`
    color: #ffffff;
    font-size: 16px;
    border: 2px solid #ffffff;
    border-radius: 16px;
    background-color: transparent;
    outline: none;
    width: 80%;
    padding: 7px 20px;
    ::placeholder{
        color: #ffffff;
    }

`