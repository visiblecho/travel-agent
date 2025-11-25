import axios from 'axios'

// import { getToken } from '../utils/token'
const getToken = () => {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY5MjQ4YWFjMjg5NmVkOTdjMmI3YzUyMSIsInVzZXJuYW1lIjoiY29ybmVsaXVzIn0sImlhdCI6MTc2NDAwMjc3MiwiZXhwIjoxNzY0MTc1NTcyfQ.Ijehuy5q-0nN3Yx0y2yY8pqMNGRBxRr9EHYDq5MdADQ'
}

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

/*
export const commentCreate = (hootId, formData) => {
  return api.post(`/${hootId}/comments`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}
*/
