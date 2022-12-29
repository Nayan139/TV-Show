import React, { useContext } from "react";
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
import "./Signup.css";
import { AuthAPI } from "../../api";
import AuthContext from "../../context";
import { useNavigate } from "react-router";

const theme = createTheme();

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().min(3, "Too Long!").required("Required"),
  lastName: Yup.string().min(3, "Too Long!").required("Required"),
  email: Yup.string().email("Please enter valid email").required("Required"),
  password: Yup.string()
    .required("Please Enter Password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

export default function SignUp() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
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
            Sign up
          </Typography>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values) => {
              const response = await AuthAPI("/signup", {
                method: "POST",
                data: values,
              });

              if (response.status >= 200 && response.status < 300) {
                auth.login();
                navigate("/dashboard");
              } else {
                auth.logout();
              }
            }}
          >
            {({ values, errors, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="firstName"
                        fullWidth
                        id="firstName"
                        label="First Name"
                        value={values.firstName}
                        onChange={handleChange}
                        autoFocus
                      />
                      <Typography sx={{ color: "red" }}>
                        {errors.firstName}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        value={values.lastName}
                        onChange={handleChange}
                      />
                      <Typography sx={{ color: "red" }}>
                        {errors.lastName}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={handleChange}
                      />
                      <Typography sx={{ color: "red" }}>
                        {errors.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={values.password}
                        onChange={handleChange}
                      />
                      <Typography sx={{ color: "red" }}>
                        {errors.password}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="/login" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            )}
          </Formik>
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
