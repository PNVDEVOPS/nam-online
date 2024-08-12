import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: red[500],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#fff',
          backgroundColor: '#0193DE', // зеленый цвет
          '&:hover': {
            backgroundColor: '#0194deaf', // более темный зеленый цвет при наведении
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#0193DE', // зеленый цвет для выбранного таба
          },
        },
      },
    },
  },
});

export default theme;
