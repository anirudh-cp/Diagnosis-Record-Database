import React, { Fragment, useEffect, useState } from 'react'
import { AppBar, Box, Toolbar, Typography, Button, MenuItem, IconButton, Menu } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

import './../../assets/styles/index.css'
import CustomTheme from '../../assets/themes/CustomTheme';

import useIdentStore from '../../storages/IdentStore';
import useAuth from '../../utils/Auth';

// TODO: Implement looping for menuitems

export default function ButtonAppBar() {

  const { hideUserOptions, getGroup } = useIdentStore();
  const navigate = useNavigate();
  const { logout, loading } = useAuth();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [groupValue, setGroupValue] = useState(null);

  useEffect(() => {
    async function check() {
      let group = await getGroup();
      setGroupValue(group);
    }
    check()
  }, [])

  const handleLogout = async () => {
    await logout();
    navigate('/')
  }

  return (

    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={CustomTheme}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, }}>
          <Toolbar >

            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" onClick={(event) => {
                setAnchorElNav(event.currentTarget);
              }} color="inherit" sx={{ pr: 2, pl: 0 }}>
                <MenuIcon />
              </IconButton>

              {!hideUserOptions && (
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                  open={Boolean(anchorElNav)}
                  onClose={() => {
                    setAnchorElNav(null);
                  }}
                  sx={{ display: { xs: 'block', md: 'none' } }}
                >
                  {groupValue === "admin" && (
                    [
                      <MenuItem onClick={() => { navigate('/dashboard'); }} key={'dashboard'}>
                        <Typography textAlign="center">Dashboard</Typography>
                      </MenuItem>,
                      <MenuItem onClick={() => { navigate('/users'); }} key={'users'}>
                        <Typography textAlign="center">Manage Users</Typography>
                      </MenuItem>,
                    ]
                  )}

                  {groupValue && (
                    <MenuItem onClick={() => { handleLogout() }} key={'logout'} disabled={loading}>
                      <Typography textAlign="center">{loading === true ? "Logging out..." : "Logout"}</Typography>
                    </MenuItem>
                  )}
                </Menu>

              )}
            </Box>

            <Typography variant="h6" component="div">DxDB</Typography>

            {!hideUserOptions &&
              <Fragment>

                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 4 }}>
                  {groupValue === "admin" &&
                    <Fragment>
                      <Button color="inherit" onClick={() => { navigate('/dashboard'); }} key={'dashboard'}>
                        Dashboard
                      </Button>
                      <Button color="inherit" onClick={() => { navigate('/users'); }} key={'users'}>
                        Manage Users
                      </Button>
                    </Fragment>
                  }
                </Box>

                {groupValue &&
                  <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 4 }}>
                    <Button color="inherit" onClick={() => handleLogout()} disabled={loading}>
                      {loading === true ? "Logging out..." : "Logout"}
                    </Button>
                  </Box>
                }

              </Fragment>
            }

          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <Toolbar />
    </Box>
  );
}
