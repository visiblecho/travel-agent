import './App.css'
import { Routes, Route } from 'react-router'

//* Page Components
import NavBar from './components/NavBar/NavBar'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import NotFound from './components/NotFound/NotFound'

import TripIndex from './components/TripIndex/TripIndex'
import TripUpdate from './components/TripUpdate/TripUpdate'

const App = () => {
  return (
    <>
    <NavBar />
    <main>
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/' element={<TripIndex />} />
        <Route path='/trips' element={<TripIndex />} />
        <Route path='/trips/:tripId' element={<TripUpdate />} />
      </Routes>
    </main>
    </>
  )
}

export default App
