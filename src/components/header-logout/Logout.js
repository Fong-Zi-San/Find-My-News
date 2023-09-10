import {useNavigate} from "react-router-dom";
import {useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import LogoutMobile from "./LogoutMobile";
import LogoutDesktop from "./LogoutDesktop";

function Logout({isLogin, username}) {
  const style = useTheme();
  const matches = useMediaQuery(style.breakpoints.down("md"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    isLogin(false);
    navigate("/");
  };

  return (
    <>
      {matches ? (
        <LogoutMobile handleLogout={handleLogout} username={username} />
      ) : (
        <LogoutDesktop handleLogout={handleLogout} username={username} />
      )}
    </>
  );
}

export default Logout;
