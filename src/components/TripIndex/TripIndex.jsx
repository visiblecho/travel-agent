import { useState, useEffect, useContext } from 'react'
import { useNavigate, Navigate } from 'react-router'

import { UserContext } from '../../contexts/UserContext.jsx'
import { tripIndex } from '../../services/trips'

import { Box, Paper, Typography, Stack, Button } from '@mui/material'

import './TripIndex.module.css'

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
    <>
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
        <Box sx={{ mb: 4, textAlign: 'center'}}>
          <Typography
            variant="h4"
            align="center"
            className="subheader"
            gutterBottom
          >
            Trips
          </Typography>
          </Box>
          {/*Slider with trips */}
          <div className="information">
            {isLoading ? (
              <p>Loading ...</p>
            ) : (
              <ul>
                {trips.map((trip) => {
                  return (
                    <li key={trip._id} onClick={() => handleEditTrip(trip._id)}>
                      <h3>{trip.title}</h3>
                      <p>{trip.description}</p>
                      <p>
                        {trip.destination}, {trip.country}
                      </p>
                      <p>
                        {trip.startDate}-{trip.endDate}
                      </p>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
          <Button
            variant="contained"
            className="primary"
            onClick={handleCreateNewTrip}
          >
            Create new trip
          </Button>
          <Button
            variant="contained"
            className="secondary"
            onClick={handleReviewPastTrip}
            disabled
          >
            Review past trip
          </Button>
      </Box>
    </>
  )
}

export default TripIndex
