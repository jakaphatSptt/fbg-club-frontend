import { useState } from 'react'
//import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './login.css'

export default function Register() {
    //const navigate = useNavigate()
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('')

    const handleRegister = async(evt)=>{
      evt.preventDefault() 
      try {
        console.log( username, password)
        await axios.post('http://localhost:4000/api/register',{ username, password })
        // localStorage.setItem('token', res.data.token)
        // navigate('/admin/customers')
      } catch (error) {
        console.log('error')
      }
    }

  return (
    <form onSubmit={handleRegister} className="login-frame">

    <label className='lb-lb1'>Enter your Enter</label>
    <div className="login-row">
      <input 
        type="text" 
        value={username}
        onChange={(e)=> setUsername(e.target.value)}
        placeholder='Username' 
        className='login-input' 
      />
    </div>
    
    <label className='lb-lb1'>Enter your Password</label>
    <div className="login-row">
      <input 
        type="password" 
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        placeholder='Password' 
        className='login-input' 
      />
    </div>
    <button type='submit' className='login-btn'>Create</button>
</form>
  )
}
