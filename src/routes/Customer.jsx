import Navbar from '../components/navbar_top/TopNavbar'
import NavbarAdmin from '../components/navbar_top/TopNavAdmin'
import Footer from '../components/footer/Footer'
import Personal from '../components/customers/Personal'

function Customer() {
  const token = localStorage.getItem('token')
  const prev = '/admin/customers'

  return(
    <>
      {token? <NavbarAdmin prev={prev}/>:<Navbar/> }
      <Personal/>
      <Footer/>
    </>
  )
}

export default Customer