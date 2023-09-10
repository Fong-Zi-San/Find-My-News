import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";

const CustomButton = styled(Button)({
  fontSize: 15,
  textTransform: "none",
  padding: "6px 12px",
  backgroundColor: "#a65195",
  "&:hover": {
    backgroundColor: "#743868",
    boxShadow: "none",
  },
  "&:active": {
    backgroundColor: "#b773aa",
    boxShadow: "none",
  },
  "&:disabled": {
    backgroundColor: "#743868",
    color: "#a65195",
  },
});

export default CustomButton;
