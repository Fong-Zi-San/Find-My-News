import React, {useState, useEffect} from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Grid,
  Typography,
  InputBase,
  Paper,
  IconButton,
  Divider,
  AppBar,
  Toolbar,
  Box,
} from "@mui/material";
import Logout from "./header-logout/Logout";
import ".././styles/Home.css";

function Header({isLogin, handleSearch, handleError}) {
  const [username, setUsername] = useState("");
  const [input, setInput] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const currentUsername = localStorage.getItem("username");
    setUsername(currentUsername);
  }, [username]);

  useEffect(() => {
    handleSearch(searchValue);
  }, [searchValue]);

  const handleSearchInput = () => {
    const trimmedInput = input.trim();
    if (!input || trimmedInput === "") {
      handleError();
    } else {
      if (trimmedInput !== searchValue) {
        setSearchValue(trimmedInput);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchInput();
    }
  };

  return (
    <AppBar position="fixed" color="secondary">
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{display: {xs: "none", md: "flex"}}} className="desktop-title">
          <Typography
            noWrap
            component="a"
            href="/home"
            sx={{
              ml: "5px",
              fontSize: 28,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FIND-MY-NEWS
          </Typography>
        </Box>
        <Box sx={{display: {xs: "flex", md: "none"}}} className="mobile-title">
          <Typography
            noWrap
            component="a"
            href="/home"
            sx={{
              ml: "5px",
              fontSize: 20,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FIND-MY-NEWS
          </Typography>
        </Box>

        <Paper className="search-bar">
          <InputBase
            placeholder="Search..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Divider sx={{height: 25, m: 0.5}} orientation="vertical" />
          <IconButton type="button" onClick={handleSearchInput}>
            <SearchIcon color="primary" />
          </IconButton>
        </Paper>

        <Grid className="user-logout-container">
          <Logout isLogin={isLogin} username={username} />
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
