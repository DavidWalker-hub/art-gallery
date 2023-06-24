
import { AppBar, Box, Button, Link, Toolbar } from "@mui/material";
import React from "react";
import { Link as RouterLink, Outlet } from "react-router-dom";
import theme from "../lib/theme";

export const Root: React.FC = () => {
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
          <Button sx={{ color: theme.palette.primary.contrastText }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};
