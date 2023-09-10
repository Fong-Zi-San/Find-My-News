import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import {
  LinearProgress,
  Alert,
  TextField,
  Grid,
  Typography,
  Stack,
} from "@mui/material";
import CustomButton from "../custom/CustomButton";
import ".././styles/Login.css";

function Login({isLogin}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginInProgress, setIsLoginInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();

  const database = [
    {username: "John", password: "111"},
    {username: "Jane", password: "222"},
  ];

  const handleLogin = () => {
    if (!username || !password) {
      setErrorMessage("missing"); //show error if no username and/or password input
    } else {
      const matchingAccount = database.find(
        (account) =>
          account.username === username && account.password === password
      );
      if (matchingAccount) {
        isLogin(username); //login only when correct username (case sensitive) and password match database's
        setIsLoginInProgress(true);
        navigate("/home");
      } else {
        setErrorMessage("invalid"); //show error message if password does not match username's in database or if username does not exist
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      className="login-page"
    >
      <Grid item>
        <Typography
          variant="h2"
          noWrap
          component="a"
          sx={{
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            textDecoration: "none",
          }}
        >
          FIND-MY-NEWS
        </Typography>
      </Grid>
      <Grid item className="login-grid" sx={{m: 5, mt: 8}}>
        <Stack direction="column" spacing={2.5}>
          <TextField
            required
            id="username"
            label="User name"
            variant="filled"
            className="username-input"
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <TextField
            required
            id="password"
            label="Password"
            variant="filled"
            type="password"
            className="password-input"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <CustomButton
            variant="contained"
            size="large"
            startIcon={<LoginIcon />}
            className="login-button"
            onClick={handleLogin}
            color="info"
          >
            Login
          </CustomButton>
          {isLoginInProgress && <LinearProgress color="primary" />}
        </Stack>
      </Grid>
      <Grid item>
        {errorMessage === "invalid" && (
          <Alert
            severity="error"
            onClose={() => {
              setErrorMessage(false);
            }}
          >
            Invalid username and/or password
          </Alert>
        )}
        {errorMessage === "missing" && (
          <Alert
            severity="warning"
            onClose={() => {
              setErrorMessage(false);
            }}
          >
            Please enter both username and password
          </Alert>
        )}
      </Grid>
    </Grid>
  );
}

export default Login;
