import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

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