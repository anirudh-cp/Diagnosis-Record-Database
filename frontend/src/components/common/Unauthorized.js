import { Container, Typography, Box, Button } from '@mui/material'
import React, { Fragment } from 'react'
import CustomTheme from '../../assets/themes/CustomTheme';
import { ThemeProvider } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const Unauthorized = () => {

    const navigate = useNavigate();

    return (
        <Fragment>
            <ThemeProvider theme={CustomTheme}>

                
                    <Container sx={{ display: "flex", justifyContent: 'space-around' }}>

                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                            <RemoveCircleOutlineIcon sx={{ fontSize: "12em" }} />
                            <Typography variant='h3' sx={{ mt: 2, mb: 3 }}> Unauthorized </Typography>
                            <Button variant='contained' onClick={() => navigate('/')}>Go to Login</Button>
                        </Box>
                    </Container>
                
            </ThemeProvider>
        </Fragment>
    )
}

export default Unauthorized