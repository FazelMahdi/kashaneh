"use client";

import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['iranyekan', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#d7a85f',
    },
    secondary: {
      main: '#fff',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        root: () => ({
          fontweight: 500,
          color: 'black'
        })

      }
      // defaultProps: {
      //   // The props to change the default for.
      //   // disableRipple: true, // No more ripple, on the whole application 💣!
      // },
    },
  },
});

export default theme;