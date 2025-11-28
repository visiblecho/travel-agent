import { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router'

import { UserContext } from '../../contexts/UserContext.jsx'
import { activityIndex, activityPropose } from '../../services/trips.js'

import {
  Box,
  Paper,
  IconButton,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  ButtonGroup,
  Stack,
  CircularProgress,
} from '@mui/material'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

const ActivityIndex = () => {
  const { user } = useContext(UserContext)
  const { tripId } = useParams()
  const [activities, setActivities] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await activityIndex(tripId)
        setActivities(data)
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

  const handleAddExpertActivity = async () => {
    const { data } = await activityPropose(tripId)
    setActivities([...activities, ...data.trip.activities])
  }

  if (!user) return <Navigate to="/auth/sign-in" />

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
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
            Experience the Unknown
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
            <Stack>
              {activities.map((activity) => (
                <Accordion key={activity._id}>
                  <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                    <Typography component="span">{activity.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {new Date(activity.startDate).toLocaleDateString()},{' '}
                      {new Date(activity.startDate).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}{' '}
                      -{' '}
                      {new Date(activity.endDate).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Typography>
                    <Typography>
                      {activity.location}
                      {activity.mapUrl && (
                        <IconButton
                          onClick={() =>
                            window.open(
                              activity.mapUrl,
                              '_blank',
                              'noopener,noreferrer',
                            )
                          }
                          edge="end"
                        >
                          <OpenInNewIcon />
                        </IconButton>
                      )}
                    </Typography>
                    <Typography>{activity.description}</Typography>

                    <Button
                      variant="outlined"
                      onClick={() =>
                        navigate(`/trips/${tripId}/activities/${activity._id}`)
                      }
                    >
                      Edit
                    </Button>
                  </AccordionDetails>
                </Accordion>
              ))}
              <ButtonGroup orientation="vertical" variant="outlined">
                <Button
                  variant="contained"
                  onClick={() => navigate(`/trips/${tripId}/activities/new`)}
                >
                  Add
                </Button>
                <Button onClick={handleAddExpertActivity}>Generate</Button>
                <Button onClick={() => navigate(`/trips/${tripId}`)}>
                  Return
                </Button>
              </ButtonGroup>
            </Stack>
          )}
        </Paper>
      </Box>
    </>
  )
}

export default ActivityIndex
