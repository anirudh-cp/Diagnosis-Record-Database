import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { GridToolbarContainer, } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';


export default function EditToolbar(props) {

    const navigate = useNavigate();

    const handleClick = () => {
        console.log('new record')
        navigate('/history', { state: {} });
    };

    return (
        <GridToolbarContainer>
            <Button color="secondary" startIcon={<AddIcon />} onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer>
    );
}
