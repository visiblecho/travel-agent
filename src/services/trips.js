import axios from 'axios'
import { getToken } from '../utils/token'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/trips`,
})

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

export const activityCreate = (tripId, formData) => {
  return api.post(`/${tripId}/activities`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}

/*
export const commentCreate = (hootId, formData) => {
  return api.post(`/${hootId}/comments`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}
*/
