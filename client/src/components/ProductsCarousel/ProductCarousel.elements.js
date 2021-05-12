import { Paper } from '@material-ui/core'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

export const LoaderContainer = styled.div`
    display: grid;
    place-items: center;
    height: 15rem;
    width: 25rem;

    @media (max-width: 1000px){
        height: 12rem;
        width: 20rem;
    };
    @media (max-width: 1000px){
        margin-top: 40px
    };
    @media (max-width: 400px){
        margin-top: 30px;
        height: 10rem;
        width: 17rem;
    };
`

export const CarouselItem = styled(Paper)`
    background-color: rgba(255,255,255,0.25);
    display: flex;
    height: 15rem;
    color: white;
    width: 25rem;
    padding: 10px;
    @media (max-width: 1000px){
        height: 12rem;
        width: 20rem;
    };
    @media (max-width: 1000px){
        margin-top: 40px
    };
    @media (max-width: 400px){
        margin-top: 30px;
        height: 10rem;
        width: 17rem;
    };

    & .carousel-img{
        width: 280px;
        height: 240px;
        background: cover;
        & img{
            width: 100%;
            height: 100%;
        }
        @media (max-width: 1000px){
            width: 230px;
            height: 190px;
        };
        @media (max-width: 400px){
            width: 180px;
            height: 160px;
        };
    }
    & .info{
        margin: 5px 5px 10px 20px;
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        padding-bottom: 20px;
        @media (max-width: 1000px){
            margin: -5px 5px 0px 15px;
            };
        @media (max-width: 400px){
            & *{
                font-size: 1rem;
            }
        };
        
        & button{
            font-weight: bold;
            padding: 10px 10px;
            text-align: center;
            text-transform: uppercase;
            transition: 0.5s;
            color: white;            
            display: flex;
            width:58%;
            align-items: center;
            justify-content: space-between;
            border: 3px solid white;
            border-radius: 10px;
            background:inherit;
            @media (max-width: 1000px){
                padding: 5px 5px;
                font-size:12px;
            };
            @media (max-width: 400px){
                font-size:10px;
                border: 1px solid white;
                padding: 8px 8px;
            };

            &:hover{
                cursor: pointer;
                background-color: white;
                color: black;
                text-decoration: none;
                width: 70%;
        }
        }
    }

`



export const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`