import { useEffect, useState } from 'react'
import { Outlet, useOutletContext, useLocation, useNavigate, } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/navbar_top/TopNavAdmin'
import BtNav from '../components/navbar_bottom/BtNavbar'
import Container from '../components/Container/Container'
import Customers from '../components/customers/CustomerManage'
import Games from '../components/boardgames/BoardgamesList'
import ConfirmPopup from '../components/popup/confirmPopup'
import ResultPopup from '../components/popup/resultPopup'
import Loading from '../components/popup/loading'
import calculatorTime from '../hook/cal-time'

function Admin(){
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const location = useLocation()
  const customersRoute = location.pathname ==='/admin/customers'
  const gamesRoute = location.pathname ==='/admin/games'
  const navTopic = customersRoute? `Customers`:`Games`
  const action = "menu"
  const [customersData, setCustomersData] = useState([])
  const [gamesData, setGamesData] = useState([])
  const [price,setPrice] = useState()
  const [showLoading,setShowLoading] = useState(true)
  const [showPopup,setShowPopup] = useState(false)
  const [confirmPopup,setConfirmPopup] = useState(false)
  const [popup,setPopup] = useState({})
  const [apiData,setApiData] = useState({topic:'', message:'', action:'', api:'', status:''})

  const fetchData = async () => {
    try {
      const customers = await axios.get('https://fbgc-backend.onrender.com/api/customers')
      const games = await axios.get('https://fbgc-backend.onrender.com/api/boardgames')
      const prices = await axios.get('https://fbgc-backend.onrender.com/api/prices')
      setCustomersData(customers.data)
      setGamesData(games.data)
      setPrice(prices.data[0])
    } catch (error) {
      console.error('error na',error)
    } finally{
      setShowLoading(false)
    }
  }

  useEffect(() => {
    if(!token){
      navigate('/login')
    }

    fetchData()
    
  },[token,navigate])

  const handleCreate = ()=>{
    if(customersRoute){
      handleCreateCid()
    }else if(gamesRoute){
      handleCreateGid()
    }
  }

  const handleCreateGid = () =>{
    navigate('/game/create/general')
  }

  const handleCreateCid = () =>{
    const id = customersData.length+1
    const pad = (num) => String(num).padStart(3,'0')
    const newId = `c${pad(id)}`
    setApiData({
      topic:`สร้าง ID ใหม่`,
      message:`เพิ่ม ${newId} เข้ามาในหน้า Customers`,
      action:`postData`
    })
    setPopup({
      topic:`สร้าง ${newId} เสร็จสิ้น`,
      message:`ท่าสามารถใช้งาน ${newId} ได้แล้ว`
    })
    setConfirmPopup(true)
  }

  const confirmCreate = async () => {
    try {
      setShowPopup(true)
      await axios.post('https://fbgc-backend.onrender.com/api/create/new-customer')
      await fetchData()
    } catch (error) {
      console.error('error na',error)
    }
  }

  const handleDelLastCid = async() =>{
    try {
      await axios.delete('https://fbgc-backend.onrender.com/api/delete/last-customer')
      .then((res)=>{ console.log(res.data)})
      await fetchData()
    } catch (error) {
      console.error('error',error)
    }
  }

  const ToggleDate = (url,cid,dateB,startTime,status,text)=> {
    const cal = calculatorTime(dateB,price)
    const pad = (num) => String(num).padStart(2,'0');
    const dateC = new Date(dateB)
    const [sh,sm] = [ pad(dateC.getHours()), pad(dateC.getMinutes()) ]
    const [h,m] = [ pad(new Date().getHours()), pad(new Date().getMinutes()) ]
    const sec1 = `${cal.mins} นาที`
    const sec2 = `${cal.hrs} ชม. ${cal.mins} นาที `
    const playTime = cal.hrs===0? sec1:sec2

    setApiData({
      topic: `${text}การใช้งาน`,
      message: `ท่านต้องการที่จะ${text}การจับเวลาของลูกค้า ${cid} ?`,
      action: `putData`,
      api: url,
      status: status
    })
    if(status==='active'){
      setPopup({
        topic:`ลูกค้า ${cid} ${text}ใช้บริการแล้ว`,
        message: `เริ่มใช้บริการที่เวลา ${h}:${m} น.`
      })
      setConfirmPopup(true)
    }else if(status==='inactive'){
      setPopup({
        topic:`ลูกค้า ${cid} ${text}ใช้บริการแล้ว`,
        p1:(<> <p> เวลาที่เริ่มใช้บริการ</p> <h3>{`${sh}:${sm} น.`}</h3> <br/> </>),
        p2:(<> <p>เวลาที่หยุดใช้บริการ</p> <h3>{`${h}:${m} น.`}</h3> <br /> </>),
        p3:(<> <p>เวลาที่ทั้งหมดที่เล่น</p> <h3>{playTime}</h3> </>),
        result:(<> <h3>ค่าบริการ</h3> <h2>{cal.charge}</h2> <h3>บาท</h3> </>)
      })
      setConfirmPopup(true)
    }
  }

  const confirmDate = async () =>{
    try {
      setShowPopup(true)
      await axios.put(apiData.api)
      await fetchData()
    } catch (error) {
      console.error('error',error)
    }
  }

  const lastCid = `c${String(customersData.length).padStart(3,'0')}`

  const customersContent = customersData.map((e)=>{
    const getDate = ()=> { ToggleDate(`https://fbgc-backend.onrender.com/api/getDate/${e._id}`,e.cid,e.dateB,e.startTime,'active','เริ่ม') }
    const clearDate = ()=> { ToggleDate(`https://fbgc-backend.onrender.com/api/clearDate/${e._id}`,e.cid,e.dateB,e.startTime,'inactive','หยุด') }
    return <Customers {...e} key={e._id} 
              getDate={getDate} 
              clearDate={clearDate}
           />
  })

  return(
    <>
      <Navbar topic={navTopic} action={action} afterMenuSubmit={handleDelLastCid} lastCid={lastCid}/>
      <Container content={ <Outlet context={{ customersData, gamesData , customersContent }}/> }/>
      <BtNav create={handleCreate} />
      
      {showLoading&&(<Loading/>)}

      {confirmPopup&&(
        <ConfirmPopup
          topic={apiData.topic}
          message={apiData.message}
          cancelBtn={() => setConfirmPopup(false)}
          okBtn={() => {
            setConfirmPopup(false)
            if(apiData.action===`postData`){
              confirmCreate()
            }if(apiData.action===`putData`){
              confirmDate()
            }
          }}
        />
      )}

      {showPopup&&(
        <ResultPopup
          topic={popup.topic}
          message={popup.message}
          p1={popup.p1}
          p2={popup.p2}
          p3={popup.p3}
          result={popup.result}
          closeBtn={() => setShowPopup(false)}
        />
      )}

    </>
  )
}

function AdCustomers() {
  const { customersContent  } = useOutletContext()
  return (
    <>
      {customersContent}
    </>
  )
}

function AdGames() {
  const { gamesData } = useOutletContext()
  return (
    <>
      {gamesData.map((e)=> 
        <Games {...e} key={e._id}  />
        )}
    </>
  )
}

export { Admin, AdCustomers, AdGames };