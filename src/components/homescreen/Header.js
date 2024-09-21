import React from 'react'
import './Header.css'
import logo from '../images/logo.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectIsAuthenticated } from '../../features/auth/authSlice'
import mobileLogo from '../images/mobileLogo.png'
import { useMediaQuery } from 'react-responsive'
// import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  const isAuthenticated = useSelector(selectIsAuthenticated)
  const user = useSelector(state => state.auth.user);

 
    const dispatch = useDispatch();
  
    const handleLogout = () => {
      dispatch(logout());
    }    

  return (
    <div>
      {isDesktopOrLaptop && 
        <nav>
        <div className="nav-left">
          <Link to='/'>
            {/* <img className='logo' src={logo} alt='logo' /> */}
            <img className='logo' src='https://res.cloudinary.com/djmtfxn8e/image/upload/v1711383815/logo_n4pfo9.png' alt='logo' />
            {/* <img className='logo' src='https://res.cloudinary.com/djmtfxn8e/image/upload/v1711383579/logo_hc8pwj.png' alt='logo' /> */}
          </Link>
        </div>
        <div className="nav-right flex items-center">
          <Link to='/about' className='link'>About</Link>
          {isAuthenticated ? (
            <div onClick={handleLogout} className='link'>Hello {user.first_name}</div>
          ) : (
            <Link to='/login' className='link'>Sign In</Link>
          )}
          <Link to='/addproduct' className='link'><button>Post Ad</button></Link>
        </div>
      </nav>
      }
      {isTabletOrMobile &&  
        <nav className='mobile-nav-left'>
        <div className="nav-left">
          <Link to='/'>
            <img className='logo mobile-logo' src={mobileLogo} alt='logo' />
          </Link>
        </div>
        <div className="nav-right">
          {isAuthenticated ? (
            <div onClick={handleLogout} className='link'>{user.first_name}</div>
          ) : (
            <Link to='/login' className='link'>Sign In</Link>
          )}
          <Link to='/addproduct' className='link'><button>Post Ad</button></Link>
        </div>
      </nav>
      }
    </div>
    
  )
}

export default Header
