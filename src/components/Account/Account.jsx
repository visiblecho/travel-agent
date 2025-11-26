import { Link } from 'react-router'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

const Account = () => {
    const { user, signOut } = useContext(UserContext)
    const capitalizeFirstLetter = (username) => {
        return username.charAt(0).toUpperCase() + username.slice(1)
    }
    return (
        <>  
            {user ? <h3>Hi, {capitalizeFirstLetter(user.username)}!</h3> : <p>Signed Out</p>}
            <h3>Your Trips</h3>
            <p>Possible list of added trips below</p>
            <h3>Account Management</h3>
            <button disabled>Edit Account</button>
            <Link to='/' onClick={signOut}><button type='submit'>Sign Out</button></Link>
            <Link to='/trips'><button>Back</button></Link>
        </>
    )
}

export default Account