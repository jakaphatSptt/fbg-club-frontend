import Navbar from '../components/navbar_top/TopNavbar'
import NavbarAdmin from '../components/navbar_top/TopNavAdmin'
import Footer from "../components/footer/Footer"
import BoardGame from "../components/boardgames/Boardgame"

function game() {
  const token = localStorage.getItem('token')
  const prev = '/admin/games'

  return (
    <>
      {token? <NavbarAdmin prev={prev}/>:<Navbar/>}
      <BoardGame/>
      <Footer/>
    </>
  )
}

export default game