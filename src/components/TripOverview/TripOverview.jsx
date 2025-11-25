import './TripOverview.module.css'

const TripOverview = () => {
    // Create some dummy data
    const trips = [
        {
            _id: '21321321',
            title: "Beijing",
            description: "Past and future",
            destination: "Beijing",
            country: "China",
            startDate: "2026-05-12",
            endDate: "2026-06-25",
            activities: [
                {
                    title: "Meet the emperor",
                    description: "Visit the remnants of the old palace",
                    date: "2026-06-02",
                }
            ]
        }, {
            _id: '57465313',
            title: "Big Apple",
            description: "Explore the known and unknown treasures",
            destination: "New York",
            country: "USA",
            startDate: "2026-09-03",
            endDate: "2026-09-10",
            activities: [
                {
                    title: "King Kong",
                    description: "Climb the Empire State Building",
                    date: "2026-06-02",
                }
            ]
        }
    ]

    // * User Actions
    const handleCreateNewTrip = () => {console.log('Create New Trip')}
    const handleReviewPastTrip = () => {console.log('Review Past Trip')}
    const handleEditTrip = () => {console.log('Edit Trip')}

    // Display the component
    return (
        <>
        <h2 className='subheader'>Trips</h2>
        <div className='information'>
            <ul>
                {trips.map(trip => {
                    return <li key={trip._id} onClick={handleEditTrip}>
                        <h3>{trip.title}</h3>
                        <p>{trip.description}</p>
                        <p>{trip.destination}, {trip.country}</p>
                        <p>{trip.startDate}-{trip.endDate}</p>
                    </li>

                })}
            </ul>
        </div>
        <div className='actions'>
            <button className='primary' onClick={handleCreateNewTrip}>Create new trip</button>
            <button className='secondary' onClick={handleReviewPastTrip} disabled>Review past trip</button>
        </div>
        </>
    )
}

export default TripOverview