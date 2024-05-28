import { Container, Typography, Box, Button } from '@mui/material'
import React, { Fragment } from 'react'
import CustomTheme from '../../assets/themes/CustomTheme';
import { ThemeProvider } from '@emotion/react';
import { useNavigate } from 'react-router-dom';


const NoPage = () => {

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
                        <Typography variant='h1' sx={{ fontSize: "10em" }}> 404 </Typography>
                        <Typography variant='h4' sx={{ mt: 2, mb: 3 }}> Page Not Found </Typography>
                        <Button variant='contained' onClick={() => navigate('/')}>Go to Home</Button>
                    </Box>
                </Container>

            </ThemeProvider>
        </Fragment>
    )
}

export default NoPage