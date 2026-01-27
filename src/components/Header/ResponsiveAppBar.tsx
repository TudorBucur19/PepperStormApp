import { useState } from "react";
import { useNavigate } from "react-router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "@mui/material";

import {
  authMenuLabels,
  menuPages,
  userSettingsMenu,
} from "src/constants/appConfigValues";
import CatLogo from "src/components/Header/CatLogo";
import { MenuIcon } from "src/components/icons";
import { useAuthContext } from "src/hooks/AuthContext";

import { appBarStyles as styles } from "src/components/styles/header.styles";

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { loggedUser, handleLogout } = useAuthContext();
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (navigateRoute: string) => {
    navigate(navigateRoute);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting: string) => {
    setAnchorElUser(null);
    if (setting === authMenuLabels.logout) {
      handleLogout();
      return;
    }
    if (setting === authMenuLabels.login) {
      navigate("/login");
    }
  };

  return (
    <AppBar position="sticky" color="default">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", alignItems: "center", minHeight: "64px" }}
        >
          {/* Left: Nav menu (mobile) or nav links (desktop) */}
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            {/* Mobile menu icon */}
            <Box
              sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
            >
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
                onClose={() => setAnchorElNav(null)}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {menuPages.map((page) => (
                  <MenuItem
                    key={page.label}
                    onClick={() => handleCloseNavMenu(page.link)}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {page.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* Desktop nav links */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                width: "100%",
              }}
            >
              {menuPages.map((page) => (
                <Link
                  key={page.label}
                  onClick={() => handleCloseNavMenu(page.link)}
                  sx={styles.link}
                >
                  {page.label}
                </Link>
              ))}
            </Box>
          </Box>
          {/* Center: Logo */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CatLogo onClick={() => navigate("/")} />
          </Box>
          {/* Right: User menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={loggedUser?.displayName || ""}
                  src={loggedUser?.photoURL || ""}
                />
              </IconButton>
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
              {userSettingsMenu(!!loggedUser).map(
                (setting) =>
                  setting.active && (
                    <MenuItem
                      key={setting.label}
                      onClick={() => handleCloseUserMenu(setting.label)}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        {setting.label}
                      </Typography>
                    </MenuItem>
                  ),
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
