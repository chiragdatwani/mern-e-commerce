import React from 'react';
import { Step, StepLabel } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { StyledStepper } from './Stepper.elements';


const StepperNav = ({stepNumber}) => {

    const steps = ['Login', 'Shipping', 'Payment', 'Place Order']
    return (
        <StyledStepper activeStep={stepNumber}>
            {steps.map( (step, index) => (
                <Step key={step} >
                    <StepLabel>
                        {index > stepNumber? 
                        <h4>{step}</h4> :
                        <Link style={{textDecoration: 'none', color: 'inherit'}} to={`/${step.toLowerCase()}`}>
                            {<h4>{step}</h4>}  
                            </Link>
                            }
                    </StepLabel>
                </Step>
            ))}
         </StyledStepper>
    )
}

export default StepperNav;
