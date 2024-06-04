import { Link } from 'react-router-dom'
import '../App.css'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const {logout} = useLogout()
  const {user} = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
        <nav>
          <div className='navItem navLogo'>
            <Link to="/">
              <h1>Logo</h1>
            </Link>
          </div>
          
          {user && (
            <>
            <div className='navItem navIndex'>
              <Link to={`/home`}>
                <h1>Store - {user.username}</h1>
              </Link>
            </div>

            <div className='navItem navUser'>
              <button onClick={handleClick}>Logout</button>
            </div>
            </>
          )}

          {!user && (
          <>
            <div className='navItem navIndex'>

            <Link to="/">
              <h1>Store</h1>
            </Link>
            </div>
          
            <div className='navItem navUser'>
            <div className='navLoginSignup'>
              <Link to="/sign-in">
                  <h1>Login</h1>
              </Link>
              <h1>/</h1>
              <Link to="/sign-up">
                  <h1>Signup</h1>
              </Link>
            </div>

          </div>
        </>
        )}
        </nav>
    </header>
  )
}

export default Navbar