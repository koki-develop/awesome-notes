import { createTheme, PaletteColorOptions } from '@mui/material/styles';

const primary: PaletteColorOptions = {
  main: '#4884FC',
  light: '#78A4FC',
  dark: '#1460FA',
  contrastText: '#FFFFFF',
};

const secondary: PaletteColorOptions = {
  main: '#FFFFFF',
  light: '#FFFFFF',
  dark: '#EAE8F3',
  contrastText: '#4884FC',
};

export const theme = createTheme({
  palette: {
    primary,
    secondary,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          textTransform: 'none',
        },
      },
    },
  },
});
