import { ThemeProvider, CssBaseline, AppBar, Typography, Toolbar, IconButton } from "@mui/material"
import MenuBookIcon from '@mui/icons-material/MenuBook'

export function Navbar(){
    return (
        <AppBar position="static" enableColorOnDark>
        <Toolbar>
          <IconButton  color="inherit" edge="start">
            <MenuBookIcon/>
          </IconButton>
          <Typography variant="h6">NYT Books </Typography>
        </Toolbar>
      </AppBar>
    )
}