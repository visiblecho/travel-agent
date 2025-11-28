import axios from 'axios'

import { getToken } from '../utils/token'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/trips`,
})

// * Trip ---------------------------------------------------------------------

export const tripCreate = (formData) => {
  return api.post('', formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}

export const tripIndex = () => {
  return api.get('', {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}

export const tripShow = (tripId) => {
  return api.get(`/${tripId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}

export const tripUpdate = (tripId, formData) => {
  return api.put(`/${tripId}`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}

export const tripDelete = (tripId) => {
  return api.delete(`/${tripId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}

// * Activity -----------------------------------------------------------------

export const activityCreate = (tripId, formData) => {
  return api.post(`/${tripId}/activities`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}

export const activityIndex = (tripId) => {
  return api.get(`/${tripId}/activities`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}

export const activityShow = (tripId, activityId) => {
  return api.get(`/${tripId}/activities/${activityId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}

export const activityUpdate = (tripId, activityId, formData) => {
  return api.put(`/${tripId}/activities/${activityId}`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}

export const activityDelete = (tripId, activityId) => {
  return api.delete(`/${tripId}/activities/${activityId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}

export const activityPropose = (tripId) => {
  return api.get(`/${tripId}/propose`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}
