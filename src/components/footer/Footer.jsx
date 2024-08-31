import './Footer.css'
import { Link } from 'react-router-dom';
import { FaTiktok } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLine } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";

function Footer() {
  return (
    <>
    <footer className="footer">
      <div className="foTitle">
        <h2>FeatureBoardGame</h2>
      </div>
      <div className="foList">
        <Link to="/">Home</Link>
        <Link to="/games">Games</Link>
        <Link to="/admin">Login</Link>
      </div>
      <div className="foSocial">
        <Link to="" className="foIcon"><FaTiktok /></Link>
        <Link to="" className="foIcon"><FaFacebook /></Link>
        <Link to="" className="foIcon"><FaInstagram /></Link>
        <Link to="" className="foIcon"><FaLine /></Link>
        <Link to="" className="foIcon"><FaDiscord /></Link>
      </div>
      <div className="fooEnd">
        <p>Copyright * PrakoiAgent.Inc</p>
      </div>

    </footer>
    </>
  )
}

export default Footer