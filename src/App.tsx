import { ThemeProvider, CssBaseline } from "@mui/material"
import theme from "./theme"
import { Navbar } from "./components/Navbar"
import { Menu } from "./components/Menu"
import { BookListPage } from "./components/BookListPage"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/bookListPage" element={<BookListPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
