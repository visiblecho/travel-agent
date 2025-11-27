import { useContext, useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router'

import { UserContext } from '../../contexts/UserContext.jsx'
import { tripCreate } from '../../services/trips.js'

import { Button, Box, Typography, Paper, TextField, Stack } from '@mui/material'

const TripCreate = () => {
  const { user } = useContext(UserContext)
  const [formData, setFormData] = useState({
    owner: '',
    title: '',
    description: '',
    destination: '',
    country: '',
    startDate: '',
    endDate: '',
    activities: [],
  })
  const [errorData, setErrorData] = useState({})
  const navigate = useNavigate()

  const handleChange = (e) => {
    const input = e.target
    setFormData({ ...formData, [input.name]: input.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await tripCreate(formData)
      // TODO: Confirm edit
      navigate('/trips/')
    } catch (error) {
      // TODO: Better error handling
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

  if (!user) return <Navigate to="/auth/sign-in" />

  return (
      <Box 
      sx={{
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
      <Typography className='subheader' variant='h4' align='center' gutterBottom>
      Capture your dream
      </Typography>
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
      <Button type='submit' variant='contained' className='primary' form='tripForm'>
          Create
        </Button>
        <Button variant='contained' className="secondary" onClick={handleReturnToOverview}>
          Return to Overview
        </Button>
        </Stack>
        </Paper>
        </Box>
  )
}

export default TripCreate
