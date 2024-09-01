import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../components/login/login.css'
import SignIn from '../components/login/login'
import Register from '../components/login/register'

export default function Login() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [ showLogin, setShowLogin ] = useState(true)
  const [ showRegister, setShowRegister ] = useState(false)

  useEffect(()=>{
    if(token){
      navigate('/admin/customers')
    }
  },[token,navigate])

  const openLogin =()=>{
    setShowRegister(false)
    setShowLogin(true)
  }

  const openRegister =()=>{
    setShowLogin(false)
    setShowRegister(true)
  }

  return (
    <div className='login-overlay'>

      <div className='main-area-0'>
        <h2 className="login-logo">FBG</h2>

        <div className="main-area-1">
          <div className="navbar-area-2">
            <div onClick={openLogin} className={`login-navbar ${showLogin&&'active'}`}>Login</div>
            <div onClick={openRegister} className={`login-navbar ${showRegister&&'active'}`}>Register</div>
          </div>

          {showLogin&&( <SignIn /> )}
          {showRegister&&( <Register/> )}

        </div>

        <Link to='/' className='go-prev'>Back</Link>
      </div>



      <p className="login-footer">Copyright * PrakoiAgent.Inc</p>
        

    </div>
  )
}
