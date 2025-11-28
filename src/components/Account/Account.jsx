import { Link } from 'react-router'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { Box, Typography, Stack, Button, ButtonGroup } from '@mui/material'
import PhotoSlider from '../Slider/PhotoSlider'

const Account = () => {
  const { user, signOut } = useContext(UserContext)
  const capitalizeFirstLetter = (username) => {
    return username.charAt(0).toUpperCase() + username.slice(1)
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: 2,
        mt: 2,
        textAlign: 'center',
      }}
    >
      {user ? (
        <>
          <Typography variant="h5">
            {' '}
            Hi, {capitalizeFirstLetter(user.username)}!
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
            Account Management
          </Typography>
          <ButtonGroup orientation="vertical" variant="outlined">
            <Button variant="contained" disabled>
              Edit Account
            </Button>
            <Button
              component={Link}
              to="/"
              onClick={signOut}
              
            >
              Sign Out
            </Button>
            <Button component={Link} to="/trips" >
              Back
            </Button>
          </ButtonGroup>
        </>
      ) : (
        <>
          <ButtonGroup orientation="vertical" variant="outlined">
          <Button component={Link} to="/auth/sign-in" variant="contained">
            Sign In
          </Button>
          <Button component={Link} to="/auth/sign-up">
            Create Account
          </Button>
          </ButtonGroup>
        </>
      )}
    </Box>
  )
}

export default Account
