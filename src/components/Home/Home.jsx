import './Home.css'
import { UserContext } from '../../contexts/UserContext'
import { useContext } from 'react'
import { Link } from 'react-router'

const Home = () => {
    const { user } = useContext(UserContext)
    return (
        <main className='home-page'>
            {!user ? (
                <div className='logged-out-home'>
                    <h1>Logo</h1>
                    <h1>Your next trip, realized</h1>
                    <p>Images of trips (placeholders)</p>
                <div className='auth-buttons'>
                    <Link to='/auth/sign-in'><button>Sign In</button></Link>
                    <Link to='/auth/sign-up'><button>Create Account</button></Link>
                </div>
                </div>
            ) : (
                <div className='logged-in-home'>
                    <h1>Logo</h1>
                    <h1>Trips</h1>
                    <div className='trips-list'>
                        <h1>Trips will go here - map</h1>
                    </div>
                <Link to='/trips/new'>
                    <button>Create New Trip</button>
                </Link>
                </div>
            )}
        </main>
    )
}

export default Home