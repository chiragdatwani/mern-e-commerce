import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { Paper } from '@material-ui/core';

export const StyledLink = styled(Link)`
        color: inherit;
        text-decoration: none;
`

export const ImageContainer = styled.div`
        width: 100px;
        height: 150px;
        position: absolute;
        transition: all .3s ease-in-out;
        box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px;
        
        left: -10px;
        & img{
                width: 100px;
                height: 150px;
        };
        
`

export const CardContainer = styled(Paper)`
        height: 170px;
        margin: 0 auto;
        width: 260px;
        display: flex;
        align-items: center;
        transition: all 3.s ease;
        position: relative;
        @media (max-width: 1130px){
                width: 240px;
        };
        &:hover {
                .card-img{
                        left: -15px;
                }
        }       
        
`

export const Info = styled.div`
        display: flex;
        padding: 10px 10px 10px 100px;
        height: 100%;
        flex-direction: column;
        justify-content: space-evenly;
        & h4{   
                margin:0;
                color: black;
                text-overflow: scroll;
        }
        & p{
                margin:0
        }
        @media (max-width: 1120px){
                & h4{   
                font-size: 12px;
                }
        }
        
`