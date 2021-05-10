import styled from 'styled-components';



export const RegisterContainer = styled.div`
    height: 85vh;
    position: relative;
    @media (orientation: portrait){
        height: 75vh;
    };
`

export const FormContainer = styled.div`
   margin-top: 30px;
    padding: 20px;
    width: 300px;;
    & > h2 {
        margin-top: 0;
    }

    & button{
        margin: 10px auto;
        width: 50%;
    }
`

export const ImgContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: flex-end;
    width: 50vw;
    height: 100%;
    right: 0%;
    bottom: 0%;
    z-index: -100;
    @media (orientation: portrait){
        width: 100vw;
    };
    & img{
        position: absolute;
        bottom: 0;
        width: 65%;
    }
`