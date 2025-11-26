import { UserContext } from '../../contexts/UserContext'
import { useContext } from 'react'
import { Link } from 'react-router'
import TripIndex from '../TripIndex/TripIndex'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { Container, Box, Typography, Stack, Button } from '@mui/material'
import PhotoSlider from '../Slider/PhotoSlider'

const Home = () => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(()=> {
    if (user) navigate('/trips')
    },[user])

    return (
        <>
            {!user ? (
                <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    px: 2, 
                    mt: 2,
                    textAlign: 'center',
                }}>
                    <Box sx={{ mb: 4, textAlign: 'center'}}>
                    <Typography variant='h4'>
                    Your next trip, realized
                    </Typography>
                    </Box>
                    {/*Slider with photos */}
                    <Box sx={{ width: '100%', maxWidth: 800, mb: 4}}>
                        <PhotoSlider/>
                        </Box>
                       {/* Action Buttons */} 
                    <Stack direction='row' spacing={2}>
                        <Button component={Link} to='/auth/sign-in' variant='contained' >
                        Sign In
                        </Button>
                        <Button component={Link} to='/auth/sign-up' variant='contained' >
                        Create Account
                        </Button>
                    </Stack>
                    </Box>
            ) : null
        }
            </>
    )
}

export default Home