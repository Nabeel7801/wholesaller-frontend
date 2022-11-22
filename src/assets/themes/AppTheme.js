import React from 'react'
import { createTheme } from '@material-ui/core/styles';

import "../demo/demo.css";
import "../demo/style.css";

export default function AppTheme() {
  return <></>
}

export const theme = createTheme({
  
    palette: {
      primary: {
        main: '#3F51B5',
        darker: '#053e85',
      },
      background: {
          default: '#fcfcfe',
      },
      info: {
        main: '#78909c',
        dark: '#607d8b',
        darker: '#546e7a',
        contrastText: '#fff',
      },

      text: {
          primary: "#000",//black
          secondary: 'rgb(119,119,119)',//gray
          hint: 'rgb(127,127,127)',
      },
    },

    breakpoints: {
        values: {
            xs: 0,
            sm: 769,
            md: 968,
            lg: 1200,
            xl: 1300,
        }
    },
});