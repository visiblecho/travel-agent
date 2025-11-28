import { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router'

import { UserContext } from '../../contexts/UserContext.jsx'
import { tripUpdate, tripShow, tripDelete } from '../../services/trips.js'
import validateDates from '../../services/dateValidation.js'

import {
  Button,
  Box,
  Typography,
  Paper,
  TextField,
  Stack,
  CircularProgress,
  ButtonGroup,
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
  const [isToDelete, setIsToDelete] = useState(false)
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

  const handleDeleteTrip = async () => {
    await tripDelete(tripId)
    navigate('/trips')
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
        <Typography variant="h5" align="center" gutterBottom>
          Trip
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
                <Typography sx={{ color: 'error.main', fontWeight: 'medium' }} className="error-message">{errorData.title}</Typography>
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
                <Typography
                  sx={{ color: 'error.main', fontWeight: 'medium' }}
                  className="error-message"
                >
                  {errorData.description}
                </Typography>
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
                <Typography
                  sx={{ color: 'error.main', fontWeight: 'medium' }}
                  className="error-message"
                >
                  {errorData.location}
                </Typography>
              )}
              <TextField
                label="Start Date"
                variant="filled"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                fullWidth
              />
              {errorData.startDate && (
                <Typography
                  sx={{ color: 'error.main', fontWeight: 'medium' }}
                  className="error-message"
                >
                  {errorData.startDate}
                </Typography>
              )}
              <TextField
                label="End Date"
                variant="filled"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                fullWidth
              />
              {errorData.endDate && (
                <Typography sx={{ color: 'error.main', fontWeight: 'medium' }} className="error-message">{errorData.endDate}</Typography>
              )}
              <ButtonGroup orientation="vertical" variant="outlined">
                <Button
                  variant="contained"
                  className="primary"
                  type="submit"
                  form="tripForm"
                >
                  Confirm
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/trips/${tripId}/activities`)}
                >
                  Activities
                </Button>
                {!isToDelete ? (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setIsToDelete(true)
                    }}
                  >
                    Delete
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeleteTrip}
                  >
                    Repeat to delete
                  </Button>
                )}
                <Button variant="outlined" onClick={() => navigate('/trips')}>
                  Return
                </Button>
              </ButtonGroup>
            </Stack>
          </>
        )}
      </Paper>
    </Box>
  )
}

export default TripUpdate
