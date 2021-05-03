import { List, ListItem } from '@material-ui/core';
import styled from 'styled-components';

export const SearchContainer = styled.div`
    margin: auto;
    width: 40%;
    color: #ffffff;
    & .MuiFilledInput-input{
        padding: 9.5px 14px !important;
        color: #ffffff
    }
`

export const MyList = styled(List)`
    margin-top: '5px';
    color: black;
`
  
export const MyListItem = styled(ListItem)`
    & :hover{
      background: '#f5f5f5f5'
    }
`

export const SearchList = styled.div`

    position: absolute;
    width: 35%;
    z-index: 111;
    /* -webkit-box-shadow: 0px 18px 23px 1px rgba(0,0,0,0.71);
    -moz-box-shadow: 0px 18px 23px 1px rgba(0,0,0,0.71);
    box-shadow: 0px 18px 23px 1px rgba(0,0,0,0.71); */
`