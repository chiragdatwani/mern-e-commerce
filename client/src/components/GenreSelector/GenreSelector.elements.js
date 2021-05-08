import { Grid } from '@material-ui/core';
import styled from 'styled-components';

export const GridContainer = styled(Grid)`
    width: 80%;
    margin: 30px auto;
    @media (max-width: 1100px){
        width: 90vw;
    };
    @media (max-width: 400px){
        margin: 10px auto;
    };
    
    & .genre{
        height: 90px;
        width: 230px;
        margin: 0 auto;
        border-radius: 15px;
        display: grid;
        place-items: center;
        transition: all .3s ease-in;
        & h3{
            color: #ffffff;
            text-transform: uppercase;
            transition: all .3s ease-in;
        };
        &:hover{
            cursor: pointer;
        };
        @media (max-width: 1300px){
            height: 90px;
            width: 200px;
        };
        @media (max-width: 1100px){
            height: 75px;
            width: 190px;
        };
        @media (max-width: 880px){
            height: 60px;
            width: 145px;
            & h3{
            font-size: 0.9rem;
        };
        };
    };
    & .thriller{
        background-color: #8C3AC7;
        &:hover{
            & h3{
                color: #8C3AC7;
                transform: scale(1.3);
            };
            background-color: #ffffff;
        };
    };
    & .romance{
        background-color: #E95C70;
        &:hover{
            & h3{
                color: #E95C70;
                transform: scale(1.3);
            };
            background-color: #ffffff;
        };
    };
    & .young-adult{
        background-color: #EF6A3A;
        &:hover{
            & h3{
                color: #EF6A3A;
                transform: scale(1.3);
            };
            background-color: #ffffff;
        };
    };
    & .science-fiction{
        background-color: #EFD140;
        &:hover{
            & h3{
                color: #EFD140;
                transform: scale(1.3);
            };
            background-color: #ffffff;
        };
    };
    & .fantasy{
        background-color: #2BA3BC;
        &:hover{
            & h3{
                color: #2BA3BC;
                transform: scale(1.3);
            };
            background-color: #ffffff;
        };
    };
    & .poetry{
        background-color: #93C548;
        &:hover{
            & h3{
                color: #93C548;
                transform: scale(1.3);
            };
            background-color: #ffffff;
        };
    };
    & .biography{
        background-color: #7F8B93;
        &:hover{
            & h3{
                color: #7F8B93;
                transform: scale(1.3);
            };
            background-color: #ffffff;
        };
    };
    & .self-help{
        background-color: #517DDF;
        &:hover{
            & h3{
                color: #517DDF;
                transform: scale(1.3);
            };
            background-color: #ffffff;
        };
    };
`

    
