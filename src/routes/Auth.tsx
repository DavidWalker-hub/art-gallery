import { Button, Container, Grid, Link, Typography } from "@mui/material";
import React, { useState } from "react";
import { Login } from "../components/Login";
import { Register } from "../components/Register";

export const Auth: React.FC = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  return (
    <Container>
      {isRegister ? <Register /> : <Login />}
      {!isRegister && (
        <Grid container justifyContent={"center"} mt={5}>
          <Typography sx={{ marginRight: 1 }}>
            Don't have an account?
          </Typography>
          <Link component="button" onClick={() => setIsRegister(!isRegister)}>
            Sign up here
          </Link>
        </Grid>
      )}
    </Container>
  );
};
