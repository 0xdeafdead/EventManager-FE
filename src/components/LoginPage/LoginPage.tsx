import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const [signIn, { data, loading, error }] = useMutation(gql`
    mutation signIn($signInInput: SignInInput!) {
      signIn(signInInput: $signInInput) {
        email
        fullName
        token
      }
    }
  `);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    signIn({
      variables: {
        signInInput: {
          email,
          password,
        },
      },
    });
  };

  useEffect(() => {
    if (data) {
      const { email, fullName, token } = data.signIn;
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
          <LockOutlined />
        </Avatar>
        <Typography sx={{ textAlign: "center" }} component="h1" variant="h4">
          Log In
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        </Box>
      </Paper>
      <Typography variant="body2" color="text.secondary" align="center">
        Don't have an account <Link to="/signUp">Sign Up</Link>
      </Typography>
    </Container>
  );
};

export default LoginPage;
