import { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router'

import { UserContext } from '../../contexts/UserContext.jsx'
import { tripUpdate, tripShow } from '../../services/trips.js'

import { Button, Box, Typography, Paper, TextField, Stack, CircularProgress } from '@mui/material'

const TripUpdate = () => {
  const { user } = useContext(UserContext)
  const [formData, setFormData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [errorData, setErrorData] = useState({})
  const { tripId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await tripShow(tripId)
        setFormData(data)
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
  }, [tripId, navigate])

  const handleChange = (e) => {
    const input = e.target
    setFormData({ ...formData, [input.name]: input.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await tripUpdate(tripId, formData)
      // TODO: Confirm edit
      navigate('/trips/')
    } catch (error) {
      // TODO: Better error handling - MC note - check if I did it right
      const res = error.response
      if (!res) {
        return setErrorData({ message: 'Network error. Try again.'})
      }
      if (res.status === 500) {
        setErrorData({ message: 'Something went wrong. Please try again.'})
      } else {
        console.error(res.data.backend)
        setErrorData(error.data.frontend)
      }
    }
  }

  const handleReturnToOverview = () => {
    navigate('/trips')
  }

  const handleAddActivities = () => {
    console.log('Add Activities')
  }

  const handleDeleteTrip = () => {
    console.log('Add Activities')
  }

  if (!user) return <Navigate to="/auth/sign-in" />

  return (
      <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        width: '100%'
      }}
      >
      <Paper 
      elevation={3}
      sx={{
        p: 4,
        width: { xs: '90%', sm: 400 },
        maxWidth: 600,
        bgcolor: '#F5F5F5'
      }}
      >
      <Typography variant='h5' align='center' className="subheader" gutterBottom>
        Edit your dream</Typography>
        {isLoading ? (
      <Box className="information"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 200,
      }}
      >
          <CircularProgress />
        </Box>
        ) : (
      <>
      <Stack 
      className='information'
      component='form'
      spacing={2}
      onSubmit={handleSubmit}
      id='tripForm'
      >
              <TextField 
                      label='Title'
        variant='outlined'
        type='text'
        name='title'
        value={formData.title}
        onChange={handleChange}
        fullWidth
        required
              />
              {errorData.title && (
                <p className="error-message">{errorData.title}</p>
              )}

            <TextField 
          label='Description'
          variant='outlined'
          type='text'
          name='description'
          value={formData.description}
          onChange={handleChange}
          fullWidth
        required
          />
              {errorData.description && (
                <p className="error-message">{errorData.description}</p>
              )}

            <TextField 
          label='Destination'
          variant='outlined'
          type='text'
          name='destination'
          value={formData.destination}
          onChange={handleChange}
          fullWidth
          required
          />
              {errorData.destination && (
                <p className="error-message">{errorData.destination}</p>
              )}

            <TextField 
          label='Country'
          variant='outlined'
          type='text'
          name='country'
          value={formData.country}
          onChange={handleChange}
          fullWidth
          required
          />
              {errorData.country && (
                <p className="error-message">{errorData.country}</p>
              )}
<TextField 
          label='Start Date'
          variant='outlined'
          type='text'
          name='startDate'
          value={formData.startDate}
          onChange={handleChange}
          fullWidth
          required
          />
              {errorData.startDate && (
                <p className="error-message">{errorData.startDate}</p>
              )}
<TextField 
          label='End Date'
          variant='outlined'
          type='text'
          name='endDate'
          value={formData.endDate}
          onChange={handleChange}
          fullWidth
          required
          />
              {errorData.endDate && (
                <p className="error-message">{errorData.endDate}</p>
              
              )}
        <Stack spacing={1} mt={2} flexWrap='wrap' justifyContent='center'>
        <Button variant='contained' className="primary" type="submit" form="tripForm" sx={{flex:1, minWidth: 120, fontSize: { xs: '0.7rem', sm: '0.875rem', md: '1rem' }}}>
          Confirm changes
        </Button>
        <Button variant='contained' className="secondary" onClick={handleAddActivities} sx={{flex:1, minWidth: 120, fontSize: { xs: '0.7rem', sm: '0.875rem', md: '1rem' }}} disabled>
          Add activity
        </Button>
        <Button variant='contained' className="secondary" onClick={handleDeleteTrip} sx={{flex:1, minWidth: 120, fontSize: { xs: '0.7rem', sm: '0.875rem', md: '1rem' }}} disabled>
          Delete trip
        </Button>
        <Button variant='contained' className="secondary" onClick={handleReturnToOverview} sx={{flex:1, minWidth: 120, fontSize: { xs: '0.7rem', sm: '0.875rem', md: '1rem' }}}>
          Return to Overview
        </Button>
      </Stack>
      </Stack>
      </>
        )}
      </Paper>
      </Box>
  )
}

export default TripUpdate
