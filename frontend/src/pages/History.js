import * as React from 'react';
import { useLocation } from 'react-router-dom';

import useIdentStore from '../storages/IdentStore';


const History = () => {

    const { setHideUserOptions } = useIdentStore();
    const location = useLocation();

    React.useEffect(() => {
        setHideUserOptions(false);
    }, [setHideUserOptions])


    React.useEffect(() => {
        JSON.stringify(location.state.rowID)
    }, [])
    

    return (
        <Container
        sx={{
            height: 500,
            width: '100%',
            '& .actions': {
                color: 'text.secondary',
            },
            '& .textPrimary': {
                color: 'text.primary',
            },
        }}
    >

        <Typography variant='h4' sx={{ mt: 3, mb: 4 }}>
            Patient History
        </Typography>

        

    </Container>
    )
}

export default History