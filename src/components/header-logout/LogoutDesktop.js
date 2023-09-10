import {Chip} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CustomButton from "../../custom/CustomButton";

export default function LogoutDesktop({handleLogout, username}) {
  return (
    <>
      <Chip
        icon={<AccountCircleIcon />}
        label={username}
        color="primary"
        sx={{mr: 1.5}}
      />
      <CustomButton
        variant="contained"
        color="info"
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
      >
        Logout
      </CustomButton>
    </>
  );
}
