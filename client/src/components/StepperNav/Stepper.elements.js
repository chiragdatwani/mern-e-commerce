import styled from 'styled-components';
import { Stepper } from '@material-ui/core'

export const StyledStepper = styled(Stepper)`
    @media (max-width: 450px){
        padding: 15px 0;
        & h4 {
            font-size: 12px
        }
    }

    @media (max-width: 400px){
        margin-left: -20px;
    }
`