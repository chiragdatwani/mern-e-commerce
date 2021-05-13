import styled from 'styled-components';

export const PaginationContainer = styled.div`
    
    margin:  40px auto;
    & ul {
        justify-content: center;
    }

    @media (max-width: 450px){
        & .MuiPaginationItem-sizeLarge{
            height: 32px;
            min-width: 32px;
            padding: 0;
        }
    }
    
`

export const TopRated = styled.div`
    margin: 60px auto;
    & h1{
        margin-bottom: 30px;
    }
` 