import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import localforage from 'localforage';

import { Avatar, Button, CssBaseline, TextField, Box, Container, ThemeProvider, Typography, LinearProgress, IconButton, InputAdornment } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import useIdentStore from '../storages/IdentStore';
import CustomTheme from './../assets/themes/CustomTheme'
import useAuth from '../utils/Auth';


export default function SignIn() {

    const navigate = useNavigate();
    const { login, loading } = useAuth();

    const { setHideUserOptions, getGroup } = useIdentStore();

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let response = await login(data.get('email'), data.get('password'))

        if (response["code"] === 200) {

            let group = await getGroup()
            if (group === 'admin')
                navigate("/dashboard");
        }
        else {
            alert(JSON.stringify(response["data"]));
        }
    };


    useEffect(() => {
        async function clear() {
            await localforage.clear()
        }
        setHideUserOptions(true);
        clear();
    }, [setHideUserOptions])


    return (
        <ThemeProvider theme={CustomTheme}>

            <Container style={{
                display: "flex", flexDirection: "column",
                // backgroundImage: `url(${background})`, backgroundPosition: "center",
                // backgroundRepeat: "no-repeat",
                // backgroundSize: "40%"
            }}>
                <Container component="main" maxWidth="xs"
                    sx={{ backgroundColor: "rgba(240,240,240,0.15)", marginTop: 5, borderRadius: "15px" }}
                >
                    <CssBaseline />

                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>

                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography component="h1" variant="h4" sx={{ pt: 1, pb: 2 }}>
                            Sign in
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password" 
                                InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton onClick={handleTogglePassword} edge="end">
                                          {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}/>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}>
                                Sign In
                            </Button>

                        </Box>

                        {loading===true && <Box sx={{ width: '100%' }}>
                            <LinearProgress />
                        </Box>}
                    </Box>
                </Container>
            </Container>
        </ThemeProvider>
    );
}