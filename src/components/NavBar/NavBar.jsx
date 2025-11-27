import { Link } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { useContext } from 'react'
import AppLogo from '../../assets/App-Logo-2.png'

import { AppBar, Toolbar, Typography, Button, Box, Stack } from '@mui/material'
import { textTransform } from '@mui/system'

const NavBar = () => {
  const { user } = useContext(UserContext)
  /* Removed capitalization as the sign-in is case-sensitive
  const capitalizeFirstLetter = (username) => {
    return username.charAt(0).toUpperCase() + username.slice(1)
  }
  */
  return (
    <Toolbar
      sx={{
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <Stack spacing={1} sx={{ alignItems: 'center', textAlign: 'center' }}>
        {/* Brand Logo */}
        <img
          src={AppLogo}
          alt="An airplane and sun composed into a logo"
          height={150}
          style={{ marginRight: 8 }}
        />

        <Typography variant="h4" color="inherit" sx={{ fontWeight: 'bold' }}>
          Travel Agent
        </Typography>

        {/* Username or Tagline */}
        {user ? (
          <Typography
            variant="h6"
            color="inherit"
            component={Link}
            to="/account"
            sx={{ textDecoration: 'none' }}
          >
            {user.username}
          </Typography>
        ) : (
          <Typography
            variant="h6"
            color="inherit"
            component={Link}
            to="/"
            sx={{ textDecoration: 'none' }}
          >
            Touch your dreams
          </Typography>
        )}
      </Stack>
    </Toolbar>
  )
}

export default NavBar
