import { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router'

import { UserContext } from '../../contexts/UserContext.jsx'
import { tripUpdate, tripShow } from '../../services/trips.js'
import validateDates from '../../services/dateValidation.js'

import {
  Button,
  Box,
  Typography,
  Paper,
  TextField,
  Stack,
  CircularProgress,
} from '@mui/material'

const TripUpdate = () => {
  const formatDateForTextField = (isoDate) => {
    if (!isoDate) return ''
    const date = new Date(isoDate)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
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
        setFormData({
          ...data,
          startDate: formatDateForTextField(data.startDate),
          endDate: formatDateForTextField(data.endDate),
        })
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
    const dateErrors = validateDates(formData.startDate, formData.endDate)
    if (Object.keys(dateErrors).length > 0) {
    setErrorData(dateErrors)
    return
    }
    const submissionData = {
      ...formData, 
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
    }
    try {
      await tripUpdate(tripId, submissionData)
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

  const handleManageActivities = () => {
    navigate(`/trips/${tripId}/activities`)
  }

  const handleDeleteTrip = () => {
    console.log('Delete Trip not implemented')
  }

  if (!user) return <Navigate to="/auth/sign-in" />

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        width: '100%',
        width: '100%',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: { xs: '90%', sm: 400 },
          maxWidth: 600,
          bgcolor: '#F5F5F5',
        }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: { xs: '90%', sm: 400 },
          maxWidth: 600,
          bgcolor: '#F5F5F5',
        }}
      >
        <Typography
          variant="h5"
          align="center"

          gutterBottom
        >
          Edit your dream
        </Typography>
        {isLoading ? (
          <Box

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
              component="form"
              spacing={2}
              onSubmit={handleSubmit}
              id="tripForm"
            >
              <TextField
                label="Title"
                variant="filled"
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
                variant="filled"
                type="text"
                multiline
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                
              />
              {errorData.description && (
                <Typography sx={{ color: 'error.main', fontWeight: 'medium'}} className="error-message">{errorData.description}</Typography>
              )}

              <TextField
                label="Location"
                variant="filled"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                fullWidth
                
              />
              {errorData.location && (
                <Typography sx={{ color: 'error.main', fontWeight: 'medium'}} className="error-message">{errorData.location}</Typography>
              )}
              <TextField
                label="Start Date"
                variant="filled"
                type="text"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                fullWidth
                
              />
              {errorData.startDate && (
                <Typography sx={{ color: 'error.main', fontWeight: 'medium'}} className="error-message">{errorData.startDate}</Typography>
              )}
              <TextField
                label="End Date"
                variant="filled"
                type="text"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                fullWidth
                
              />
              {errorData.endDate && (
                <p className="error-message">{errorData.endDate}</p>
              )}
              <Stack spacing={1} mt={2} flexWrap="wrap" justifyContent="center">
                <Button
                  variant="contained"
                  className="primary"
                  type="submit"
                  form="tripForm"
                >
                  Confirm changes
                </Button>
                <Button variant="outlined" onClick={handleManageActivities}>
                  Manage activities
                </Button>
                <Button variant="outlined" onClick={handleDeleteTrip} disabled>
                  Delete trip
                </Button>
                <Button variant="outlined" onClick={handleReturnToOverview}>
                  Return to overview
                </Button>
              </Stack>
            </Stack>
          </>
        )}
      </Paper>
    </Box>
    </Box>
  )
}

export default TripUpdate
