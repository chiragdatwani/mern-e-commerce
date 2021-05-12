import { List, ListItem } from '@material-ui/core';
import styled from 'styled-components';

export const SearchContainer = styled.div`
    margin: auto;
    width: 40%;
    color: #ffffff;
    & .MuiInputBase-input{
        padding: 9.5px 14px !important;
        color: #ffffff !important;
    };
    & form{
        position: relative;
        & .MuiSvgIcon-root {
            position: absolute;
            right: 15%;
            top: 18%;
            @media (max-width: 750px){
                right: -5%;
            }
            @media (max-width: 620px){
               display: none;
            }
        }
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
    
    @media (max-width: 500px){
        width: 50%
    }
`

export const StyledInput = styled.input`
    color: #ffffff;
    font-size: 16px;
    border: none;
    border-radius: 16px;
    background-color: rgba(255, 255, 255, .15);  
    outline: none;
    width: 80%;
    text-overflow: ellipsis;
    padding: 10px 20px;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
    ::placeholder{
        color: #ffffff;
    };
    &:hover{
        background-color: rgba(255, 255, 255, .25);
    };
    &:focus{
        background-color: rgba(255, 255, 255, .25);
    };
    @media (max-width: 750px){
            font-size: 15px;
            padding: 11px 10px;
            width: 100%
            }
`