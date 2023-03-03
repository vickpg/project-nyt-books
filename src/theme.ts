import { createTheme, PaletteOptions } from "@mui/material"

const palette: PaletteOptions = {
    mode: 'dark',
    primary:{
        main:'#008B8B',
        contrastText: '#242526',
    },
    background:{
        default:'#242526',
    }
}

const theme = createTheme({
    palette
}); 

export default theme;