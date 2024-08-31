import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopNavbar.css'
import { IoMenu } from "react-icons/io5";
import Menu from '../menu/menu'

function TopNavAdmin(props) {
    const { topic, action, afterMenuSubmit, lastCid , prev} = props
    const navigate = useNavigate()
    const [ menuOpen, setMenuOpen] = useState(false)

    const handleMenu = () =>{
      setMenuOpen(prevState => !prevState);
      console.log('open menu')
    }

    const menuSubmit = () =>{
      afterMenuSubmit()
    }

    const handlePrev =()=>{
      navigate(prev)
    }

  return (
    <nav className="top-nav">
      <h2 className="logo">LOGO</h2>
      <h2 className='admin-topic'>{topic}</h2>

      <div className='admin-nav-menu'>
        {action===`menu`?
           <button onClick={handleMenu} className={`admin-menu ${menuOpen ? 'active' : ''}`}><IoMenu /></button>
           :
           <button onClick={handlePrev} className='admin-log'>BACK</button>
        }
        
      </div>

      {menuOpen&&( <Menu delLastCid={menuSubmit} lastCid={lastCid} />) }

    </nav>
  )
}

export default TopNavAdmin