import { createTheme } from '@mui/material/styles';


const CustomTheme = createTheme({
  palette: {
    mode: 'dark',
    type: 'light',
    primary: {
      main: '#2F2F2F',
    },
    secondary: {
      main: '#90caf9',
      //main: '#1034a6',
    },
    dark: {
      main: '#2F2F2F',
    }
  },
});


export default CustomTheme;

// https://bareynol.github.io/mui-theme-creator/