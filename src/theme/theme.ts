// src/theme/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#000000' }, // your brand color
    secondary: { main: '#FFFFFF' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#000000',  // black background
          color: '#ffffff',            // white text
          '&:hover': {
            backgroundColor: '#222222', // slightly lighter on hover
          },
        },
      },
    },
  },
});

export default theme;
