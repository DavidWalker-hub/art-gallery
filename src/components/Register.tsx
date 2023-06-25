import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAppContext } from "../contexts/appContext";

export const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { register, user } = useAppContext();
  console.log("user", user);
  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();
    register(email, password);
    console.log("email", email);
    console.log("password", password);
  };
  return (
    <Box>
      <form onSubmit={handleRegister}>
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
              Register
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
              Sign up
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
