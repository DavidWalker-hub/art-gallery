import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import theme from "../lib/theme";
import { useAppContext } from "../contexts/appContext";

export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAppContext();

  const handleLogin = (event: any) => {
    event.preventDefault();
    login(email, password);
  };
  return (
    <Box>
      <form onSubmit={handleLogin}>
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          spacing={5}
          mt={10}
        >
          <Grid item xs={7}>
            <Typography
              variant="h1"
              fontSize={26}
              fontWeight={600}
              textAlign={"center"}
              color={"primary"}
            >
              Login
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              type="email"
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              type="password"
              label="Password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent={"center"} alignItems={"center"} mt={7}>
          <Grid item>
            <Button variant="contained" type="submit">
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
