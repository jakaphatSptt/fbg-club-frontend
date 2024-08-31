import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './menu.css'
import { IoMdPricetags } from "react-icons/io";
import { BiSolidUserMinus } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import ConfirmPopup from '../popup/confirmPopup';
import PricePopup from '../popup/pricePopup'
import Popup from '../popup/popup';
import Success from '../popup/success'


export default function Menu(props) {
  const { delLastCid,lastCid } = props
  const navigate = useNavigate()
  const [ dataPopup, setDataPopup] = useState({})
  const [ showConfirm, setConfirm ] = useState(false)
  const [ showPrice, setShowPrice ] = useState(false)
  const [ showPopup, setPopup ] = useState(false)

  const handlePricing = ()=> {
    setShowPrice(true)
  }

  const onSubmitPricing =()=> {
    setDataPopup({
      topic: <Success /> ,
      message: `บันทึกค่าบริการใหม่เรียบร้อยแล้ว`,
      action: `refresh`
    })
    setShowPrice(false)
    setPopup(true)
  }

  const onConfirmDel = ()=>{
    setDataPopup({
      topic:`ลบ ${lastCid} สำเร็จ`,
      message:`ทำการลบ ${lastCid} เรียบร้อยแล้ว`,
    })
    delLastCid()
    setPopup(true)
  }

  const handleDelLastCid =()=> {
    setDataPopup({
      topic:`กำลังทำการลบ ID`,
      message:`ระบบจะทำการลบ ${lastCid} ซึ่งเป็นไอดีลำดับสุดท้าย`,
      confirm: onConfirmDel
    })
    setConfirm(true)
  }

  const handleLogout = ()=> {
    setDataPopup({
      topic:`กำลังออกจากระบบ`,
      message:`กด ok เพื่อออกจากระบบ`,
      confirm: ()=> {localStorage.removeItem('token'), navigate('/')}
    })
    setConfirm(true)
  }
    
  return (
    <div className='menu-overlay'>
        <h3 className='menu-r1-text'>MENU</h3>

        <button onClick={handlePricing} className='menu-r1'>
            <span className='r2-i'> <IoMdPricetags /> </span>
            <p className='r2-p'>Pricing</p>
        </button>

        <button onClick={handleDelLastCid} className='menu-r1'>
            <span className='r2-i'> <BiSolidUserMinus /> </span>
            <p className='r2-p'>Delete</p>
        </button>

        <div className="hr-menu"></div>

        <button onClick={handleLogout}  className='menu-r1'>
            <span className='r2-i'> <BiLogOut /> </span>
            <p className='r2-p'>Log out</p>
        </button>

        {showConfirm&&(
          <ConfirmPopup
            topic={dataPopup.topic}
            message={dataPopup.message}
            cancelBtn={()=> setConfirm(false)}
            okBtn={ ()=> {
              setConfirm(false)
              if(dataPopup.confirm){
                dataPopup.confirm()
            }
            }}
          />
        )}

        {showPrice&&(
          <PricePopup 
            closeBtn={() => {setShowPrice(false)}}
            afterUpdate={onSubmitPricing}
          />
        )}

        {showPopup&&( 
          <Popup
            topic={dataPopup.topic}
            message={dataPopup.message}
            closeBtn={ ()=> {
              setPopup(false)
              if(dataPopup.action==`refresh`){
                navigate(0)
              }
            }}
          />
        )}

    </div>
  )
}
