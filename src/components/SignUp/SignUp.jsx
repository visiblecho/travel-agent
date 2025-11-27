import { useState } from "react";
import { useNavigate } from "react-router";
import { signUpService } from "../../services/auth";

import { Typography, TextField, Button, Box, Stack, Paper } from "@mui/material";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorData, setErrorData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorData({ ...errorData, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUpService(formData);
      navigate("/auth/sign-in");
    } catch (error) {
      const res = error.response;
      if (!res) {
        return setErrorData({ message: "Network error. Try again." });
      }
      if (res.status === 500) {
        setErrorData({ message: "Something went wrong. Please try again." });
      } else {
        console.error(res.data.backend);
        setErrorData(res.data.frontend);
      }
    }
  };
  return (
    <>
      <Box 
      sx={{ 
        minHeight: '100hv',
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}>
      <Paper 
      elevation={3}
      sx={{
        p: 4,
        width: { xs: '90%', sm: 400 },
        bgcolor: '#F5F5F5'
      }}
      >
      <Typography variant="h4" align='center'gutterBottom>
         Create Account
        </Typography>
      <Stack 
        component='form'
        spacing={2}
        onSubmit={handleSubmit}
      >
        <TextField
            label='Username'
            variant='outlined'
            type="text"
            name="username"
            value={formData.username}
            placeholder="Username"
            onChange={handleChange}
            fullWidth
            required
          />
          {errorData.username && (
            <p className="error-message">{errorData.username}</p>
          )}
            <TextField
            label='Email'
            vartiant='outlined'
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          {errorData.email && (
            <p className="error-message">{errorData.email}</p>
          )}
          <TextField
            label='Enter Password'
            vartiant='outlined'
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            onChange={handleChange}
            required
          />
          {errorData.password && (
            <p className="error-message">{errorData.password}</p>
          )}
          <TextField
            label='Confirm Password'
            vartiant='outlined'
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
          />
          {errorData.confirmPassword && (
            <p className="error-message">{errorData.confirmPassword}</p>
          )}
          <Button type='submit' variant="contained">
          Create Account
        </Button>
        {errorData.message && (
          <p className="error-message">{errorData.message}</p>
        )}
      </Stack>
      </Paper>
      </Box>
    </>
  );
};

export default SignUp;
