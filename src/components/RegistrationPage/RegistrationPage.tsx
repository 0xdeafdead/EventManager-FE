import { Key } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

import { UserInput } from "../../types/user";
import { SessionData } from "../../types/session";

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState<UserInput>({
    email: "",
    fullName: "",
    password: "",
  });

  const [register, { data, loading, error }] = useMutation<{
    signUp: SessionData;
  }>(gql`
    mutation signUp($registerInput: SignUpInput!) {
      signUp(signUpInput: $registerInput) {
        email
        fullName
        token
      }
    }
  `);

  useEffect(() => {
    if (data) {
      const { email, fullName, token } = data.signUp;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("sessionEmail", email);
      sessionStorage.setItem("sessionFullName", fullName);
      navigate("/");
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({
      variables: {
        registerInput: {
          email: dataForm.email,
          fullName: dataForm.fullName,
          password: dataForm.password,
        },
      },
    });
  };
  return (
    <Container maxWidth="xs">
      <Paper elevation={16} sx={{ marginTop: 8, padding: 2 }}>
        <Avatar
          sx={{
            m: "auto",
            bgcolor: "secondary.main",
            textAlign: "center",
            mb: 1,
          }}
        >
          <Key />
        </Avatar>
        <Typography sx={{ textAlign: "center" }} component="h1" variant="h4">
          Sign Up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            name="fullName"
            autoComplete="name"
            autoFocus
            onChange={(e) =>
              setDataForm({ ...dataForm, fullName: e.target.value })
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) =>
              setDataForm({ ...dataForm, email: e.target.value })
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e) =>
              setDataForm({ ...dataForm, password: e.target.value })
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
      <Typography variant="body2" color="text.secondary" align="center">
        Already have an account? <Link to="/login">Log In</Link>
      </Typography>
    </Container>
  );
};

export default RegistrationPage;
