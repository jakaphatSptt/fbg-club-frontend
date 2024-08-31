import Navbar from '../components/navbar_top/TopNavAdmin'
import BtNav from '../components/navbar_bottom/BtNavbar'
import Container from '../components/Container/Container'
import BoardgamesList from '../components/boardgames/BoardgamesList'
import DelEdit from '../components/boardgames/DelEdit'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState,useEffect } from 'react'

function GamesManage() {
  const navTopic = "Games"
  const navigate = useNavigate()
  const create = () => navigate('/game/create')

  const [data,setData] = useState([])

  useEffect(()=>{
    const callApi = async() => {
      try {
        await axios.get('http://localhost:4000/api/boardgames')
        .then((res)=>{
          setData(res.data)
        })
      } catch (error) {
        console.error('error na',error)
      }
    }
    callApi();
  },[])

  const content = data.map((e)=>{
    return <BoardgamesList {...e} key={e._id} manage={<DelEdit {...e} key={e._id}/>}/>
  })
  
  return (
    <>
      <Navbar topic={navTopic}/>
      <Container content={content}/>
      <BtNav create={create}/>
    </>
  )
}

export default GamesManage