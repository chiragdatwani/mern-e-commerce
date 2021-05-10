import styled from 'styled-components';
import {Card, Container} from '@material-ui/core'

export const InfoContainer = styled.div`

    max-height: 100%;
    & p{
        margin: 10px 0;
    };

    @media (max-width: 900px){
        & h2{
            font-size: 22px;
        }
    };
    @media (max-width: 500px){
        & h2{
            font-size: 19px;
        }
    }
    
`

export const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0;
    margin: 0 auto;
    > * {
        width: 65%;
    }
`

export const StyledContainer = styled(Container)`
    margin-top: 2rem;
    
`

export const AddToCartContainer = styled(Card)`
    
    padding: 1rem 1.5rem;

    > * {
        width: 100%;
        margin: 10px auto;
        text-align: center;
    }

`

export const ReviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid gray;
    padding: 10px;

    & > h4{
        margin: 0;
    }

    & > .MuiRating-root{
        margin: 10px;
        font-size: 1.2rem;
    }

    & > h5{
        margin: 0px 0 5px 15px;
        font-size: 15px;
        font-weight: 550
    }
`

export const ModalBody = styled(Card)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    outline: none;
    width: 400px;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    align-items:flex-start;
    & > .MuiTextField-root{
        margin: 10px 0;
    }

    @media (max-width: 470px){
        width: 80vw;
    }
`

export const ImgAndInfo = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 250px;
    & img{
        width: 160px;
        height: 250px;
        margin-right: 15px;
    }
    & h2{
        margin: 0;
    }
`

export const RatingContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
    & .num-review {
        margin-left: 8px;
        font-size:12px;
    }
`

export const DescriptionContainer = styled.div`
    margin-top: 40px;

    & p{
        white-space: pre-line;
        &::first-letter{
            font-size: 2rem;
            font-weight: 400;
            color: #4A2FF9;
            line-height: 30px;
        }
    }
`