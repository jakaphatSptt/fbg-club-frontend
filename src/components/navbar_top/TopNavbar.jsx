import { Link } from 'react-router-dom';
import './TopNavbar.css'

function Nav(){
    return(
        <>
        <nav className="top-nav">

            <div className='logo'>FBG</div>

            <div className='mid-nav'>
                <Link to="/" className='mid-li'>Home</Link>
                <Link to="/games" className='mid-li'>Games</Link>
            </div>

            <div className="end-nav">
                <Link to='/login' className="admin-log" >Log in</Link>
            </div>

        </nav>
        </>

    )

}

export default Nav;