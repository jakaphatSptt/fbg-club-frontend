import Nav  from "../components/navbar_top/TopNavbar"
import Footer from "../components/footer/Footer"
import Container from "../components/Container/Container"
import Boardgames from "../components/boardgames/BoardgamesList"
import axios from 'axios'
import { useState,useEffect } from 'react'

function Games() {
  const [data,setData] = useState([])

  useEffect(()=>{
    const callApi =async()=> {
      try {
        await axios.get('http://localhost:4000/api/boardgames')
        .then((res)=>{
          setData(res.data)
        })
      } catch (error) {
        console.error('error bro',error)
      }
    }
    callApi();
  },[])

  const content = data.map((e)=>{
    return <Boardgames {...e} key={e._id}/>
  })
  return (
    <>
      <Nav/>
      <Container content={content}/>
      <Footer/>
    </>
  )
}

export default Games