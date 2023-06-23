import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import React from "react";
import { Profile } from "../common/authorization/Profile";
import { logout } from "../../firebase/Firebase";
import { User } from "firebase/auth";
import Iconify from "../common/iconify/Iconify";

type Props = {
  user: User | null | undefined;
  loading: boolean;
};

export function Header({ user, loading }: Props) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Box>
        <Toolbar>
          <Iconify
            icon="game-icons:progression"
            sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PERIODISATION PROGRAM APP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            ></Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            {loading ? null : user === null || user === undefined ? (
              <Button variant="text" color="inherit" href={`/signin`}>
                Sign In
              </Button>
            ) : (
              <Profile user={user} handleLogout={handleLogout} />
            )}
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
