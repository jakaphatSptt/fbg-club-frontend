import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import "./Boardgames.css"
import Popup from '../popup/popup';
import ConfirmPopup from '../popup/confirmPopup';
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

function DelEdit(props) {
  const {title, gid } = props
  const navigate = useNavigate()
  const [showPopup, setShowPopup] = useState(false)
  const [confirmPopup, setConfirmPopup] = useState(false)

  const confirmDel = async()=>{
      setConfirmPopup(true)
  }

  const handelDel = async()=>{
    try {
      await axios.delete(`https://fbgc-backend.onrender.com/api/game/delete/${gid}`)
      .then((res)=>{ console.log(res.data)})
      setShowPopup(true)
      setConfirmPopup(false)
    } catch (error) {
      console.error('error',error)
    }
  }

  return (
    <>
      <div className="game-btn">
        <Link onClick={confirmDel} className="btn-3 del">
        <span><RiDeleteBin6Fill /></span>
        Delete
        </Link>
        <Link to={`/game/${gid}/edit/general`} className="btn-3 edit">
        <span><MdModeEdit /></span>
        Edit
        </Link>
      </div>

      {confirmPopup&&(
        <ConfirmPopup
          topic={`กำลังลบ ${title}`}
          message={`ต้องการลบ ${gid} ออกจากรายการ`}
          cancelBtn={()=> setConfirmPopup(false)}
          okBtn={handelDel}
        />
      )}

      {showPopup&&( 
        <Popup
          topic={`ลบเกมสำเร็จ`}
          message={`ทำการลบ ${title} ออกจากรายการแล้ว`}
          closeBtn={()=> {setShowPopup(false), navigate('/admin/games')}}
        />
      )}
    </>
  )
}

export default DelEdit