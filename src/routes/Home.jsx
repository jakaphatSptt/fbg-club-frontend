import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TopNav from '../components/navbar_top/TopNavbar'
import Footer from '../components/footer/Footer'
import FindId from '../components/home/FindID'

function Home() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(()=>{
    if(token){
      navigate('/admin/customers')
    }
  },[token,navigate])

  return (
    <>
    <TopNav/>
    <FindId/>
    <Footer/>
    </>
  )
}

export default Home