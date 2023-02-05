import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthAPI } from "../../api";
import AuthContext from "../../context";
import { useNavigate } from "react-router";

const theme = createTheme();

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Please enter valid email").required("Required"),
  password: Yup.string()
    .required("Please Enter Password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

export default function Login() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [isError, setIsError] = useState("");
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={async (values) => {
              const response = await AuthAPI("/login", {
                method: "POST",
                data: values,
              });
              if (response.status >= 200 && response.status < 300) {
                await auth.login();
                await auth.handleShow();
                navigate("/dashboard");
              } else {
                setIsError(response.data);
                auth.logout();
              }
            }}
          >
            {({ values, errors, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mt: 1 }}>
                  <Grid container spacing={0}>
                    <Grid item xs={12}>
                      <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={handleChange}
                        autoFocus
                      />
                      <Typography sx={{ color: "red" }}>
                        {errors.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                      />
                      <Typography sx={{ color: "red" }}>
                        {errors.password}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Sign In
                      </Button>
                    </Grid>
                    <Grid container>
                      <Grid item xs></Grid>
                      <Grid item>
                        <Link href="/signup" variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
        <Box sx={{ mt: 3, mb: 3 }}>
          <Typography variant="body2" color="red" align="center">
            {isError !== "" ? isError.message : null}
          </Typography>
        </Box>
        <Box sx={{ mt: 8, mb: 4 }}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
              Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
