import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { signInService } from '../../services/auth'
import { getUserFromToken, setToken } from '../../utils/token'
import { UserContext } from '../../contexts/UserContext'

import {
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  Paper,
  CircularProgress,
} from '@mui/material'
// import FormCard from "../../theme/formCard";
// import FormRow from "../../theme/FormRom";

const SignIn = () => {
  const { setUser } = useContext(UserContext)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [errorData, setErrorData] = useState({})
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrorData({ ...errorData, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await signInService(formData)
      const token = response.data.token
      if (token) setToken(token)
      setUser(getUserFromToken())
      navigate('/trips')
    } catch (error) {
      //console.log('Full error response:', error.response)
      //console.log('Error data:', error.response?.data)
      const res = error.response
      if (!res) {
        return setErrorData({ message: 'Network error. Try again' })
      }
      if (res.status === 500) {
        setErrorData({ message: 'Something went wrong. Please try again.' })
      } else {
        console.error('Frontend errors:', res.data.frontend)
        console.error('Backend errors:', res.data.backend)
        //console.error(res.data.backend);
        setErrorData(res.data.frontend)
      }
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <Box
        sx={{
          minHeight: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: { xs: '90%', sm: 400 },
            bgcolor: '#F5F5F5',
          }}
        >
          <Typography variant="h4" textAlign="center" p={3} gutterBottom>
            Sign In
          </Typography>
          <Stack component="form" spacing={2} onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="filled"
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
              label="Password"
              variant="filled"
              type="password"
              name="password"
              id="password"
              value={formData.password}
              
              onChange={handleChange}
              required
            />
            {errorData.password && (
              <Typography sx={{ color: 'error.main', fontWeight: 'medium'}} className="error-message">{errorData.password}</Typography>
            )}
            <Button type="submit" variant="contained">
              {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
            {errorData.message && (
              <Typography sx={{ color: 'error.main', fontWeight: 'medium'}} className="error-message">{errorData.message}</Typography>
            )}
          </Stack>
        </Paper>
      </Box>
    </>
  )
}

export default SignIn
