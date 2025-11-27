import { useState, useEffect, useContext } from 'react'
import { useNavigate, Navigate } from 'react-router'

import { UserContext } from '../../contexts/UserContext.jsx'
import { tripIndex } from '../../services/trips'
import TripSlider from '../Slider/TripSlider.jsx'

import { Box, Typography, Button, CircularProgress, Stack } from '@mui/material'

const TripIndex = () => {
  const { user } = useContext(UserContext)
  const [trips, setTrips] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await tripIndex()
        setTrips(data)
      } catch (error) {
        // TODO: Better error handling
        console.log(error)
        const { status, data } = error.response
        if (status === 500) {
          setErrorData({ message: 'Something went wrong. Please try again.' })
        } else if (status === 404) {
          navigate('/page-not-found')
        } else {
          setErrorData(data)
        }
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [navigate])

  // * User Actions
  const handleEditTrip = (id) => {
    console.log('Edit Trip', `/trips/${id}`)
    navigate(`/trips/${id}`)
  }

  const handleCreateNewTrip = () => {
    console.log('Create New Trip')
    navigate('/trips/new')
  }

  const handleReviewPastTrip = () => {
    console.log('Review Past Trip')
  }

  if (!user) return <Navigate to="/auth/sign-in" />

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
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography
          variant="h4"
          align="center"
          className="subheader"
          gutterBottom
          sx={{ mb: 4 }}
        >
          Trips
        </Typography>
      </Box>
      {/* Loading Spinner */}
      {isLoading ? (
        <Box sx={{ mt: 6 }}>
          <CircularProgress size={50} />
          <Typography sx={{ mt: 2, color: 'gray' }}>
            Loading trips ...
          </Typography>
        </Box>
      ) : (
        <>
          {/*Slider with trips */}
          <Box sx={{ width: '100%', maxWidth: 800, mb: 4 }}>
            <TripSlider trips={trips} />
          </Box>
        </>
      )}
      {/* Buttons */}
      <Stack spacing={1} mt={2} flexWrap="wrap" justifyContent="center">
        <Button variant="contained" onClick={handleCreateNewTrip}>
          Create trip
        </Button>
        <Button variant="outlined" onClick={handleReviewPastTrip} disabled>
          Review trip
        </Button>
      </Stack>
    </Box>
  )
}

export default TripIndex
