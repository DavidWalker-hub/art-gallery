
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import theme from "../lib/theme";

export const Root: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: theme.palette.primary.light }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            color={theme.palette.primary.contrastText}
          >
            Art Gallery
          </Typography>
          <Button sx={{ color: theme.palette.primary.contrastText }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};
