import { Routes, Route } from 'react-router'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//* Page Components
import NavBar from './components/NavBar/NavBar'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import NotFound from './components/NotFound/NotFound'
import Home from './components/Home/Home'
import Account from './components/Account/Account'

import TripIndex from './components/TripIndex/TripIndex'
import TripCreate from './components/TripCreate/TripCreate'
import TripUpdate from './components/TripUpdate/TripUpdate'
import ActivityIndex from './components/ActivityIndex/ActivityIndex'
import ActivityCreate from './components/ActivityCreate/ActivityCreate';
import ActivityUpdate from './components/ActivityUpdate/ActivityUpdate';

const App = () => {
  return (
    <>
    <NavBar />
    <main>
      <Routes>
        <Route index element={<Home />}/>
        <Route path='auth/sign-in' element={<SignIn />} />
        <Route path='auth/sign-up' element={<SignUp />} />
        <Route path='/account' element={<Account />} />
        <Route path='/trips' element={<TripIndex />} />
        <Route path='/trips/new' element={<TripCreate />} />
        <Route path='/trips/:tripId' element={<TripUpdate />} />
        <Route path='/trips/:tripId/activities' element={<ActivityIndex />} />
        <Route path='/trips/:tripId/activities/new' element={<ActivityCreate />} />
        <Route path='/trips/:tripId/activities/:activityId' element={<ActivityUpdate />} />
        
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
    </main>
    </>
  )
}

export default App
