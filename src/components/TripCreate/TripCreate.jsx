import { useContext, useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router'

import { UserContext } from '../../contexts/UserContext.jsx'
import { tripCreate } from '../../services/trips.js'
import validateDates from '../../services/dateValidation.js'

import { Button, Box, Typography, Paper, TextField, Stack } from '@mui/material'

const TripCreate = () => {
  const { user } = useContext(UserContext)
  const [formData, setFormData] = useState({
    owner: '',
    title: '',
    description: '',
    location : '',
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
    e.preventDefault();
    const dateErrors = validateDates(formData.startDate, formData.endDate)
    if (Object.keys(dateErrors).length > 0) {
      setErrorData(dateErrors)
      return
    }
    const dateFormConversion = {
      ...formData, 
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString()
    }
    try {
      const { data } = await tripCreate(dateFormConversion)
      // TODO: Confirm edit
      navigate('/trips/')
    } catch (error) {
      // TODO: Better error handling
      console.log(error)
      if (error.response.status === 500) {
        return setErrorData({
          message: 'Something went wrong. Please try again.',
        })
      }
      setErrorData(error.response.data)
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
      <Typography className='subheader' variant='h4' align='center' p={2} gutterBottom>
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
        variant='filled'
        type='text'
        name='title'
        value={formData.title}
        onChange={handleChange}
        fullWidth
        required
        />
            {errorData.title && (
              <Typography sx={{ color: 'error.main', fontWeight: 'medium'}} className="error-message">{errorData.title}</Typography>
            )}
          <TextField 
          label='Description'
          variant='filled'
          multiline
          rows={3}
          name='description'
          value={formData.description}
          onChange={handleChange}
          fullWidth
          />
            {errorData.description && (
              <Typography sx={{ color: 'error.main', fontWeight: 'medium'}} className="error-message">{errorData.descirption}</Typography>
            )}
          <TextField 
          label='Location'
          variant='filled'
          type='text'
          name='location'
          value={formData.location}
          onChange={handleChange}
          fullWidth
          />
            {errorData.location && (
              <Typography sx={{ color: 'error.main', fontWeight: 'medium'}} className="error-message">{errorData.location}</Typography>
            )}
          <TextField 
          label='Start Date'
          variant='filled'
          type='date'
          name='startDate'
          value={formData.startDate}
          onChange={handleChange}
          focused
          />
            {errorData.startDate && (
              <Typography sx={{ color: 'error.main', fontWeight: 'medium'}} className="error-message">{errorData.startDate}</Typography>
            )}
          <TextField 
          label='End Date'
          variant='filled'
          type='date'
          name='endDate'
          value={formData.endDate}
          onChange={handleChange}
          focused
          />
            {errorData.endDate && (
              <Typography sx={{ color: 'error.main', fontWeight: 'medium'}} className="error-message">{errorData.endDate}</Typography>
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
