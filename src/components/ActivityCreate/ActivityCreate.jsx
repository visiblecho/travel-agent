import { useContext, useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router'

import { UserContext } from '../../contexts/UserContext.jsx'
// import { activityCreate } from '../../services/trips.js'

import { Button, Box, Typography, Paper, TextField, Stack } from '@mui/material'

const ActivityCreate = () => {
  const { user } = useContext(UserContext)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    mapUrl: '',
    startDate: '',
    endDate: '',
    websiteUrl: '',
  })
  const { tripId } = useParams()
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
      navigate(`/trips/${tripId}/activities`)
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
    navigate(`/trips/${tripId}/activities`)
  }

  if (!user) return <Navigate to="/auth/sign-in" />

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
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
        <Typography
          className="subheader"
          variant="h4"
          align="center"
          gutterBottom
        >
          Capture your dream
        </Typography>
        <Stack
          className="information"
          component="form"
          spacing={2}
          onSubmit={handleSubmit}
          id="tripForm"
        >
          <TextField
            label="Title"
            variant="outlined"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
          />
          {errorData.title && (
            <p className="error-message">{errorData.title}</p>
          )}
          <TextField
            label="Description"
            variant="outlined"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            required
          />
          {errorData.description && (
            <p className="error-message">{errorData.descirption}</p>
          )}
          <TextField
            label="websiteUrl"
            variant="outlined"
            type="text"
            name="websiteUrl"
            value={formData.websiteUrl}
            onChange={handleChange}
            fullWidth
          />
          {errorData.websiteUrl && (
            <p className="error-message">{errorData.websiteUrl}</p>
          )}
          <TextField
            label="Location"
            variant="outlined"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
            required
          />
          {errorData.mapUrl && (
            <p className="error-message">{errorData.location}</p>
          )}
          <TextField
            label="mapUrl"
            variant="outlined"
            type="text"
            name="mapUrl"
            value={formData.mapUrl}
            onChange={handleChange}
            fullWidth
          />
          {errorData.mapUrl && (
            <p className="error-message">{errorData.mapUrl}</p>
          )}
          <TextField
            label="Start Date"
            variant="outlined"
            type="text"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            fullWidth
            required
          />
          {errorData.startDate && (
            <p className="error-message">{errorData.startDate}</p>
          )}
          <TextField
            label="End Date"
            variant="outlined"
            type="text"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            fullWidth
            required
          />
          {errorData.endDate && (
            <p className="error-message">{errorData.endDate}</p>
          )}
          <Button
            type="submit"
            variant="contained"
            className="primary"
            form="tripForm"
          >
            Create
          </Button>
          <Button
            variant="contained"
            className="secondary"
            onClick={handleReturnToOverview}
          >
            Return to Overview
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}

export default ActivityCreate
