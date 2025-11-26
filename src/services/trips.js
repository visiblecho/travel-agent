import axios from 'axios'

import { getToken } from '../utils/token'
/*
const getToken = () => {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY5MjQ4YWFjMjg5NmVkOTdjMmI3YzUyMSIsInVzZXJuYW1lIjoiY29ybmVsaXVzIn0sImlhdCI6MTc2NDA3NDM2MywiZXhwIjoxNzY0MjQ3MTYzfQ.toU5wJHy_8-7KRL5A0g6mq4V9z-urlpGeng7jfjT0W4'
}
  */

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
