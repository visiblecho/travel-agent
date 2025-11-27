import { useContext, useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router'

import { UserContext } from '../../contexts/UserContext.jsx'
import { activityCreate } from '../../services/trips.js'

import {
  Button,
  Box,
  Typography,
  Paper,
  TextField,
  Stack,
  InputAdornment,
  IconButton,
} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

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
      const { data } = await activityCreate(tripId, formData)
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
        <Typography variant="h5" align="center" gutterBottom>
          Experience the Unknown
        </Typography>
        <Stack
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
            error={!errorData}
            helperText={errorData.title}
          />
          <TextField
            label="Description"
            variant="outlined"
            type="text"
            multiline
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            error={!errorData}
            helperText={errorData.descirption}
          />
          <TextField
            label="websiteUrl"
            variant="outlined"
            type="text"
            name="websiteUrl"
            value={formData.websiteUrl}
            onChange={handleChange}
            fullWidth
            error={!errorData}
            helperText={errorData.websiteUrl}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        if (formData.websiteUrl) {
                          window.open(
                            formData.websiteUrl,
                            '_blank',
                            'noopener,noreferrer',
                          )
                        }
                      }}
                      edge="end"
                      disabled={!formData.mapUrl}
                    >
                      <OpenInNewIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            label="Location"
            variant="outlined"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
            error={!errorData}
            helperText={errorData.location}
          />
          <TextField
            label="mapUrl"
            variant="outlined"
            type="text"
            name="mapUrl"
            value={formData.mapUrl}
            onChange={handleChange}
            fullWidth
            error={!errorData}
            helperText={errorData.mapUrl}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        if (formData.mapUrl) {
                          window.open(
                            formData.mapUrl,
                            '_blank',
                            'noopener,noreferrer',
                          )
                        }
                      }}
                      edge="end"
                      disabled={!formData.mapUrl}
                    >
                      <OpenInNewIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            label="Start Date"
            variant="outlined"
            type="text"
            name="startDate"
            placeholder="YYY-MM-DD"
            value={formData.startDate}
            onChange={handleChange}
            fullWidth
            error={!errorData}
            helperText={errorData.startDate}
          />
          <TextField
            label="End Date"
            variant="outlined"
            type="text"
            name="endDate"
            placeholder="YYY-MM-DD"
            value={formData.endDate}
            onChange={handleChange}
            fullWidth
            error={!errorData}
            helperText={errorData.endDate}
          />
          <Stack spacing={2}>
            <Button type="submit" variant="contained" form="tripForm">
              Create
            </Button>
            <Button variant="outlined" onClick={handleReturnToOverview}>
              Return to Overview
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}

export default ActivityCreate
