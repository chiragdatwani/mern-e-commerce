import styled from 'styled-components';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { TableRow } from '@material-ui/core';


export const Delete = styled(DeleteIcon)`
    color: red;
    & :hover{
        cursor: pointer;
    }
`

export const Edit = styled(EditIcon)`
    color: teal;
    & :hover{
        cursor: pointer;
    }
`
export const ButtonContainer = styled.div`
    margin-top: -30px;
    margin-bottom: 15px;
    float: right;
`

export const StyledTableRow = styled(TableRow)`
    & :hover{
        cursor: pointer;
        background-color: #f5f5f5f5;
    }
`
