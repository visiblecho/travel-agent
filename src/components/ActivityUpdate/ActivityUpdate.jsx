import { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router'

import { UserContext } from '../../contexts/UserContext.jsx'
import { activityShow, activityUpdate, activityDelete } from '../../services/trips.js'

import {
  Button,
  Box,
  Typography,
  Paper,
  TextField,
  Stack,
  InputAdornment,
  IconButton,
  ButtonGroup,
} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

const ActivityUpdate = () => {
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
  const { tripId, activityId } = useParams()
  const [errorData, setErrorData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isToDelete, setIsToDelete] = useState(false)
  const navigate = useNavigate()

  const formatDateForTextField = (isoDate) => {
    if (!isoDate) return ''
    const date = new Date(isoDate)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await activityShow(tripId, activityId)
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
    try {
      const { data } = await activityUpdate(tripId, activityId, formData)
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

  const handleDeleteActivity = async () => {
    await activityDelete(tripId, activityId)
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
            variant="filled"
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
            variant="filled"
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
            label="Location"
            variant="filled"
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
            variant="filled"
            type="text"
            name="mapUrl"
            value={formData.mapUrl || ''}
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
            variant="filled"
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
            variant="filled"
            type="text"
            name="endDate"
            placeholder="YYY-MM-DD"
            value={formData.endDate}
            onChange={handleChange}
            fullWidth
            error={!errorData}
            helperText={errorData.endDate}
          />

          <ButtonGroup orientation="vertical" variant="outlined">
            <Button type="submit" variant="contained" form="tripForm">
              Confirm
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
                    onClick={handleDeleteActivity}
                  >
                    Repeat to delete
                  </Button>
                )}
            <Button onClick={() => navigate(`/trips/${tripId}/activities`)}>
              Return
            </Button>
          </ButtonGroup>
        </Stack>
      </Paper>
    </Box>
  )
}

export default ActivityUpdate
