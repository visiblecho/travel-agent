import { useState } from "react";
import { useNavigate } from "react-router";
import { signUpService } from "../../services/auth";

import { Typography, TextField, Button, Box, Stack, Paper, CircularProgress } from "@mui/material";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorData, setErrorData] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorData({ ...errorData, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
    } finally {
      setIsLoading(false)
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
      <Typography variant="h4" textAlign='center' p={3} gutterBottom>
         Create Account
        </Typography>
      <Stack 
        component='form'
        spacing={2}
        onSubmit={handleSubmit}
      >
        <TextField
            label='Username'
            variant='filled'
            type="text"
            name="username"
            value={formData.username}
            
            onChange={handleChange}
            fullWidth
            required
          />
          {errorData.username && (
            <Typography sx={{ color: 'error.main', fontWeight: 'medium'}} className="error-message">{errorData.username}</Typography>
          )}
            <TextField
            label='Email'
            variant='filled'
            type="email"
            name="email"
            id="email"
            
            onChange={handleChange}
            required
          />
          {errorData.email && (
            <Typography sx={{ color: 'error.main', fontWeight: 'medium'}} className="error-message">{errorData.email}</Typography>
          )}
          <TextField
            label='Enter Password'
            variant='filled'
            type="password"
            name="password"
            id="password"
            
            onChange={handleChange}
            required
          />
          {errorData.password && (
            <Typography sx={{ color: 'error.main', fontWeight: 'medium'}} className="error-message">{errorData.password}</Typography>
          )}
          <TextField
            label='Confirm Password'
            variant='filled'
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            
            onChange={handleChange}
            required
          />
          {errorData.confirmPassword && (
            <Typography sx={{ color: 'error.main', fontWeight: 'medium'}} className="error-message">{errorData.confirmPassword}</Typography>
          )}
          <Button type='submit' variant="contained">
          {isLoading ? (
            <CircularProgress size={24} /> 
          ) : (
            'Create Account'
          )}
        </Button >
        {errorData.message && (
          <Typography sx={{ color: 'error.main'}} className="error-message">{errorData.message}</Typography>
        )}
      </Stack>
      </Paper>
      </Box>
    </>
  );
};

export default SignUp;
