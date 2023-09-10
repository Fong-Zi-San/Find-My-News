import {useState, useRef} from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  IconButton,
  MenuList,
  MenuItem,
  Popper,
  Paper,
  Grow,
  ClickAwayListener,
} from "@mui/material";

export default function LogoutMobile({handleLogout, username}) {
  const [openMenu, setOpenMenu] = useState(false);
  const anchorRef = useRef(null);

  const toggleMenu = () => {
    setOpenMenu((prevOpen) => !prevOpen);
  };

  const handleCloseMenu = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    setOpenMenu(false);
  };

  return (
    <>
      <IconButton ref={anchorRef} onClick={toggleMenu}>
        <MenuIcon color="primary" />
      </IconButton>

      <Popper
        anchorEl={anchorRef.current}
        open={openMenu}
        disablePortal
        transition
      >
        {({TransitionProps}) => (
          <Grow {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleCloseMenu}>
                <MenuList>
                  <MenuItem disableRipple divider>
                    User: {username}
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
