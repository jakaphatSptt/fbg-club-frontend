import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import './login.css'
import { FaUser } from "react-icons/fa6";
import { RiLock2Fill } from "react-icons/ri";

export default function Login() {
    const navigate = useNavigate()
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ wrong, setWrong ] = useState(false)
    const [ wrongText, setWrongText ] = useState('')

    const handleLogin = async(evt)=>{
      evt.preventDefault() 
      try {
        const res = await axios.post('http://localhost:4000/api/login',{ username, password })
          localStorage.setItem('token', res.data.token)
          navigate('/admin/customers')
          console.log('welcome')
      } catch (error) {
        if(error.response){
          if(error.response.status === 401){
            console.log('incorrect username or password')
            setWrongText('username หรือ password ผิด')
            setWrong(true)
          }else if(error.response.status === 400){
            console.log('enter your username and password')
            setWrongText('กรุณาใส่ username และ password')
            setWrong(true)
          }
        }else{
          console.error('error', error)
        }
      }
    }

  return (
        <form onSubmit={handleLogin} className="login-frame">

            <div className={`login-row ${wrong? 'wrong':''}`}>
              <span className='login-i'><FaUser /></span>
              <input 
                type="text" 
                value={username}
                onChange={(e)=> {setUsername(e.target.value), setWrong(false)}}
                placeholder='Username' 
                className='login-input' 
              />
            </div>
            <div className={`login-row ${wrong? 'wrong':''}`}>
              <span className='login-i'><RiLock2Fill /></span>
              <input 
                type="password" 
                value={password}
                onChange={(e)=> {setPassword(e.target.value), setWrong(false)}}
                placeholder='Password' 
                className='login-input' 
              />
            </div>
            {wrong&& <p className='wrong-text'>{wrongText}</p>}
            <Link className='forgot'>Forgot password?</Link>
            <button type='submit' className='login-btn'>Log In</button>
        </form>
  )
}
