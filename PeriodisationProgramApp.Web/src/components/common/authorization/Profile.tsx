import {
  IconButton,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { User } from "firebase/auth";
import React from "react";

type Props = {
  user: User;
  handleLogout: () => void;
};

export const Profile = ({ user, handleLogout }: Props) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const name = user.displayName === null ? undefined : user.displayName;
  const photo = user.photoURL === null ? undefined : user.photoURL;

  return (
    <>
      <Tooltip arrow title="Account">
        <Box sx={{ py: 1, px: 0 }}>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={name} src={photo} />
          </IconButton>
        </Box>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem key={"Logout"} onClick={handleLogout}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
