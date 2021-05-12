import styled from 'styled-components';

export const Main = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items:center;
    position: absolute;
    left:0;
    @media (max-width: 700px){
        flex-direction:column;
        align-items:center;
    };
    @media (min-width: 1640px){
        right: 0;
        & h1{
            font-size: 3rem;
        }
    }
    
`

export const Heading = styled.h1`
    flex: 0.4;
    color: #ffffff;
    font-size: 2.4rem;
    width: 100%;
    margin-top: -12px;
    @media (max-width: 1200px){
        flex: 0.5;
    }
    @media (max-width: 860px){
        flex: 0.5;
        font-size:2rem;
        text-align:center;
        margin-top: 0;
    }
    @media (max-width: 450px){
        flex: 0.5;
        font-size:1.8rem;
        text-align:center;
        font-weight: 500;
        word-spacing: 0.1px;
    }
`