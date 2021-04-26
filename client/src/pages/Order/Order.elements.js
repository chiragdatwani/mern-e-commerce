import styled from 'styled-components';

export const OrderItem = styled.div`
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > img{
        margin-right: 10px;
    }
`

export const ShippingMessage = styled.span`
    font-size: 10px;
`

export const SummaryItem = styled.p`
    font-size: 20px;
`

export const Message = styled.div`
    margin-bottom: 5px;
`