import { Link } from 'react-router'
import { Box, Typography, Button } from '@mui/material'

const NotFound = () => {
  return (
    <>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: 2,
        mt: 2,
        textAlign: 'center',
      }}>
      <Typography variant='h5' sx={{ mb: 2}}>Oops! Page not found.</Typography>
      <Button  component={Link} variant='contained' to="/">Back to home</Button>
      </Box>
    </>
  )
}

export default NotFound