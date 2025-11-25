import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { tripIndex } from '../../services/trips'

import './TripIndex.module.css'

const TripIndex = () => {
  const [trips, setTrips] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await tripIndex()
        setTrips(data)
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

  // * User Actions
  const handleEditTrip = (id) => {
    console.log('Edit Trip', `/trips/${id}`)
    navigate(`/trips/${id}`)
  }

  const handleCreateNewTrip = () => {
    console.log('Create New Trip')
    navigate('/trips/new')
  }

  const handleReviewPastTrip = () => {
    console.log('Review Past Trip')
  }

  // Display the component
  return (
    <>
      <h2 className="subheader">Trips</h2>
      <div className="information">
        {isLoading ? (
          <p>Loading ...</p>
        ) : (
          <ul>
            {trips.map((trip) => {
              return (
                <li key={trip._id} onClick={() => handleEditTrip(trip._id)}>
                  <h3>{trip.title}</h3>
                  <p>{trip.description}</p>
                  <p>
                    {trip.destination}, {trip.country}
                  </p>
                  <p>
                    {trip.startDate}-{trip.endDate}
                  </p>
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <div className="actions">
        <button className="primary" onClick={handleCreateNewTrip}>
          Create new trip
        </button>
        <button className="secondary" onClick={handleReviewPastTrip} disabled>
          Review past trip
        </button>
      </div>
    </>
  )
}

export default TripIndex
