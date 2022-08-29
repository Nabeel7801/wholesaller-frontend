import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
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
export default theme 