import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar_top/TopNavAdmin'
import { CreateForm } from '../components/form/createForm'
import { EditForm } from '../components/form/editForm'

function FormPage(props) {
  const {type} = props
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const action = "back"
  const prev = '/admin/games'

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[token,navigate])

  return (
    <>
      <Navbar topic={type} action={action} prev={prev}/>
      {type==='Create'? <CreateForm/>:<EditForm/>}
    </>
  )
}

export default FormPage;