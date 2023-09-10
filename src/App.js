import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import {useEffect, useState} from "react";
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@mui/material/styles";
import "./styles/App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#a65195",
    },
    secondary: {
      main: "#30198f",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 670,
      md: 900,
      lg: 1200,
      xl: 1750,
    },
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const isLogin = (username) => {
    if (username) {
      setIsLoggedIn(true);
      localStorage.setItem("username", username);
    } else {
      setIsLoggedIn(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              !isLoggedIn ? (
                <Login isLogin={isLogin} />
              ) : (
                <Navigate replace to="/home" />
              )
            }
          />
          <Route
            path="/home"
            element={
              isLoggedIn ? (
                <Home isLogin={isLogin} />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
