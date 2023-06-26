import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { Loader } from "./Loader";

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { register, isSupabaseLoading } = useAppContext();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    await register(email, password);
    navigate("/");
  };
  return (
    <Box>
      {isSupabaseLoading ? (
        <Loader />
      ) : (
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
                required
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                type="password"
                label="Password must be at least 6 characters"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent={"center"}
            alignItems={"center"}
            mt={7}
          >
            <Grid item>
              <Button variant="contained" type="submit">
                Sign up
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Box>
  );
};
