
import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { Link as RouterLink, Outlet, useNavigate } from "react-router-dom";
import theme from "../lib/theme";
import { useAppContext } from "../contexts/appContext";

export const Root: React.FC = () => {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: theme.palette.primary.light }}
      >
        <Toolbar>
          <Link
            component={RouterLink}
            to={"/"}
            variant="h6"
            sx={{ flexGrow: 1, textDecoration: "none" }}
            color={theme.palette.primary.contrastText}
          >
            Art Gallery
          </Link>
          {!user ? (
            <Link
              component={RouterLink}
              to="/auth"
              sx={{ textDecoration: "none" }}
              color={theme.palette.primary.contrastText}
            >
              Login
            </Link>
          ) : (
            <div>
              <IconButton onClick={handleClick}>
                <Avatar>{user.email?.slice(0, 1).toUpperCase()}</Avatar>
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={() => navigate("/collection")}>
                  Collection
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};
