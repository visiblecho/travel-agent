import './Account.css'
import { Link } from 'react-router'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

const Account = () => {
    const { user, signOut } = useContext(UserContext)
    return (
        <>  
            <h3>Hi, {user.username}!</h3>
            <button>Edit Account</button>
            <Link to='/' onClick={signOut}><button type='submit'>Sign Out</button></Link>
        </>
    )
}

export default Account