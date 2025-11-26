import { useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router'
import { Stack, TextField, Button } from '@mui/material'

import { UserContext } from '../../contexts/UserContext.jsx'
import { tripCreate } from '../../services/trips.js'

const ActivityCreate = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    mapUrl: '',
    startDate: '',
    endDate: '',
    websiteUrl: '',
    imageUrl: '',
  })
  const navigate = useNavigate()

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await activityCreate(formData)
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

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          required
          label="Title"
          value={formData.title}
          onChange={handleChange('title')}
        />
        <TextField
          label="Description"
          multiline
          rows={3}
          value={formData.description}
          onChange={handleChange('description')}
        />
        <TextField
          label="Location"
          value={formData.location}
          onChange={handleChange('location')}
        />
        <TextField
          label="Map URL"
          type="url"
          value={formData.mapUrl}
          onChange={handleChange('mapUrl')}
        />
        <TextField
          label="Start Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.startDate}
          onChange={handleChange('startDate')}
        />
        <TextField
          label="End Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.endDate}
          onChange={handleChange('endDate')}
        />
        <TextField
          label="Website URL"
          type="url"
          value={formData.websiteUrl}
          onChange={handleChange('websiteUrl')}
        />
        <TextField
          label="Image URL"
          type="url"
          value={formData.imageUrl}
          onChange={handleChange('imageUrl')}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  )
}

export default ActivityCreate
