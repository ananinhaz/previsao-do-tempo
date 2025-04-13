import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
  palette: {
    primary: {
      main: '#1565c0', 
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#1976d2', 
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(0deg, rgba(20,52,93,1) 0%, rgba(40,140,200,1) 100%)',
          minHeight: '100vh', 
          margin: 0,
        },
      },
    },
  },
});
