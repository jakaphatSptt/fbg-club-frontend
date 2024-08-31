import { useState,useEffect } from 'react'
import axios from 'axios'
import './popup.css'
import ConfirmPopup from './confirmPopup'

export default function Price(props) {
  const { closeBtn, afterUpdate } = props
  const [ textPop, setTextPop ] = useState({})
  const [ showConfirm, setShowConfirm ] = useState(false)
  const [ input, setInput ] = useState({
    hrs1:'',
    hrs2:'',
    hrs3:'',
    hrs4:'',
    hrs5:'',
  })

  const inputChange =(evt)=>{
    const {name, value} = evt.target
    setInput(pp => ({
      ...pp, [name]: value
    }))
  }

  const handleSubmit =(evt)=>{
    evt.preventDefault()    // หยุดการรีเฟรชของ form
    setTextPop({
      topic:`กำลังอัพเดตค่าบริการ`,
      message:`กด ok เพื่อทำการอัพเดต`
    })
    setShowConfirm(true)
  }

  const handleUpdate = async() =>{
    try {
      await axios.put('http://localhost:4000/api/prices/update',input)
      /// โชว์หน้า setShowPopup(true) 
    } catch (error) {
      console.error('error',error)
    }
    setShowConfirm(false)
    afterUpdate() /// function ที่ส่งมาจาก menu สั่งให้ปิด component นี้
  }

  useEffect(()=>{
    const priceApi = async()=>{
      try {
        const res = await axios.get('http://localhost:4000/api/prices')
        setInput(res.data[0])
      } catch (error) {
        console.log(error)
      }
    }
    priceApi()
  },[])

  return (
    <>
    <div className="popup-overlay">

        <form className="popup" onSubmit={handleSubmit}>

          <h2 className="pu-topic"> กำหนดค่าบริการ</h2>

          <div className="pu-content">
            <h3 className='pu-mes'> 
              ชั่วโมงที่ 1
              <input type='text' name='hrs1' value={input.hrs1} onChange={inputChange}  className='pu-input'/> 
              บาท 
            </h3>
            <h3 className='pu-mes'> 
              ชั่วโมงที่ 2
              <input type='text' name='hrs2' value={input.hrs2} onChange={inputChange} className='pu-input'/> 
              บาท 
            </h3>
            <h3 className='pu-mes'> 
              ชั่วโมงที่ 3
              <input type='text' name='hrs3' value={input.hrs3} onChange={inputChange} className='pu-input'/> 
              บาท 
            </h3>
            <h3 className='pu-mes'> 
              ชั่วโมงที่ 4
              <input type='text' name='hrs4' value={input.hrs4} onChange={inputChange} className='pu-input'/> 
              บาท 
            </h3>
            <h3 className='pu-mes'> 
              5 ชม.ขึ้นไป 
              <input type='text' name='hrs5' value={input.hrs5} onChange={inputChange} className='pu-input'/> 
              บาท 
            </h3>
          </div>

          <div className="pop-btn-area">
            <button onClick={closeBtn} className="popup-btn">CLOSE</button>
            <button type="submit" className="popup-btn ok">SUBMIT</button>
          </div>

        </form>

        {showConfirm&&(
          <ConfirmPopup
          topic={textPop.topic}
          message={textPop.message}
          cancelBtn={()=>setShowConfirm(false)}
          okBtn={handleUpdate}
          />
        )}

    </div>
    </> 
  )
}
