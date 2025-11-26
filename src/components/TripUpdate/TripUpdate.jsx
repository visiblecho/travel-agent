import { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router'

import { UserContext } from '../../contexts/UserContext.jsx'
import { tripUpdate, tripShow } from '../../services/trips.js'

import './TripUpdate.module.css'

const TripUpdate = () => {
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
        setFormData(data)
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
      await tripUpdate(tripId, formData)
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

  const handleAddActivities = () => {
    console.log('Add Activities')
  }

  const handleDeleteTrip = () => {
    console.log('Add Activities')
  }

  if (!user) return <Navigate to="/auth/sign-in" />

  return (
    <>
      <h2 className="subheader">Capture your dream</h2>
      <div className="information">
        {isLoading ? (
          <p>Loading ...</p>
        ) : (
          <form id="tripForm" onSubmit={handleSubmit}>
            <div className="form-control">
              <label hidden htmlFor="title">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                required
                value={formData.title}
                onChange={handleChange}
              />
              {errorData.title && (
                <p className="error-message">{errorData.title}</p>
              )}
            </div>

            <div className="form-control">
              <label hidden htmlFor="description">
                Description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="description"
                required
                value={formData.description}
                onChange={handleChange}
              />
              {errorData.description && (
                <p className="error-message">{errorData.description}</p>
              )}
            </div>

            <div className="form-control">
              <label hidden htmlFor="destination">
                Description
              </label>
              <input
                type="text"
                name="destination"
                id="destination"
                placeholder="destination"
                required
                value={formData.destination}
                onChange={handleChange}
              />
              {errorData.destination && (
                <p className="error-message">{errorData.destination}</p>
              )}
            </div>

            <div className="form-control">
              <label hidden htmlFor="country">
                Country
              </label>
              <input
                type="text"
                name="country"
                id="country"
                placeholder="country"
                required
                value={formData.country}
                onChange={handleChange}
              />
              {errorData.country && (
                <p className="error-message">{errorData.country}</p>
              )}
            </div>

            <div className="form-control">
              <label hidden htmlFor="startDate">
                Start Date
              </label>
              <input
                type="text"
                name="startDate"
                id="startDate"
                placeholder="startDate"
                required
                value={formData.startDate}
                onChange={handleChange}
              />
              {errorData.startDate && (
                <p className="error-message">{errorData.startDate}</p>
              )}
            </div>

            <div className="form-control">
              <label hidden htmlFor="endDate">
                End Date
              </label>
              <input
                type="text"
                name="endDate"
                id="endDate"
                placeholder="endDate"
                required
                value={formData.endDate}
                onChange={handleChange}
              />
              {errorData.endDate && (
                <p className="error-message">{errorData.endDate}</p>
              )}
            </div>
          </form>
        )}
      </div>
      <div className="actions">
        <button className="primary" type="submit" form="tripForm">
          Confirm changes
        </button>
        <button className="secondary" onClick={handleAddActivities} disabled>
          Add activity
        </button>
        <button className="secondary" onClick={handleDeleteTrip} disabled>
          Delete trip
        </button>
        <button className="secondary" onClick={handleReturnToOverview}>
          Return to Overview
        </button>
      </div>
    </>
  )
}

export default TripUpdate
