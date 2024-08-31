import './BtNavbar.css'
import { Link } from 'react-router-dom';
import { PiUserListFill} from "react-icons/pi";
import { IoLogoGameControllerA } from "react-icons/io";
import { CgAdd } from "react-icons/cg";

function BtNav(props){
    const {create} = props

    return(
        <>
        <nav className='bottom-t'>

            <Link to="customers" className="btt-btn">
                <span className='nav-i'><PiUserListFill /></span>
                <p className='nav-p' >Customers</p>
            </Link>

            <button onClick={create} className='create-btn'>
                <CgAdd />
            </button>

            <Link to="games" className="btt-btn">
                <span className='nav-i'><IoLogoGameControllerA /></span>
                <p className='nav-p'>Games</p>
            </Link>

        </nav>
        </>
    )
}

export default BtNav;