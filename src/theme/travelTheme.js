import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let travelTheme = createTheme({
    palette: { // color components (light, dark, contrastText optional, will be calcualted based on palette.primary.main)
        primary: {
            main: '#00897B', // main shade of the color 
        },
        secondary: {
        main: '#FF7043',      // 
    }, 
        background: {
            default: '#eae8dfff',
            paper: '#FFFFF',
        },
        error: {
        main: '#d32f2f',
        // light: '#ef5350',
        // dark: '#c62828',
        // contrastText: '#fff'
    },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '6rem',
            fontWeight: 300,
        },
        h2: {
            fontSize: '3.75rem',
            fontWeight: 300,
        },
        h3: {
            fontSize: '3rem',
            fontWeight: 400,
        },
        h4: {
            fontSize: '2.125rem',
            fontWeight: 400,
        },
        h5: {
            fontSize: '1.5rem',
            fontWeight: 400,
        },
        h6: {
            fontSize: '1.25rem',
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 8,
    },
    spacing: 8,
    })

travelTheme = responsiveFontSizes(travelTheme) // automatically reduces typography on smaller screens 

export default travelTheme