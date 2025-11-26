import './Home.css'
import { UserContext } from '../../contexts/UserContext'
import { useContext } from 'react'
import { Link } from 'react-router'
import TripIndex from '../TripIndex/TripIndex'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { Box, Typography, Stack, Button, Paper } from '@mui/material'

const Home = () => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(()=> {
    if (user) navigate('/trips')
    },[user])

    return (
        <main className='home-page'>
            {!user ? (
                <div className='logged-out-home'>
                    <h1>Your next trip, realized</h1>
                    <p>Images of trips (placeholders)</p>
                <div className='auth-buttons'>
                    <Link to='/auth/sign-in'><button>Sign In</button></Link>
                    <Link to='/auth/sign-up'><button>Create Account</button></Link>
                </div>
                </div>
            ) : null
        }
        </main>
    )
}

export default Home