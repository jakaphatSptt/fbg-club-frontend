import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './home.css'
import Popup from '../popup/popup'

function FindID()  {
  const [cData,setCData] = useState([])
  const [input,setInput] = useState('')
  const [showPopup,setShowPopup] = useState(false)
  const [pData,setPData] = useState({topic:'',message:''})
  const navigate = useNavigate()

  const search = async() =>{
    if(input.trim()=== ''){
      setPData({
        topic: 'ข้อมูลไม่ถูกต้อง',
        message: 'กรุณากรอกเลข id ของคุณ'
      });
      setShowPopup(true);
    }else{
      try {
        const result = cData.find((e)=> e.cid== input)
        if(result){
          if(result.date){
            navigate(`/customer/${result.cid}`)
          }else if(!result.date){
            setPData({
              topic: `${input} ยังไม่เปิดใช้งาน`,
              message: `ติดต่อพนักงาน เพื่อเปิดใช้งาน id นี้`
            });
            setShowPopup(true);
          }
        }else{
          setPData({
            topic: `ไม่พบ ${input}`,
            message: `กรุณากรอกเลข id ของคุณใหม่อีกครั้ง`
          });
          setShowPopup(true);
        }
      } catch (error) {
        console.error('error na bro', error)
        setPData({
          topic: 'เกิดข้อผิดพลาด',
          message: 'ไม่รู้จะอธิบายยังไง แต่มันทุกอย่างมันผิดพลาดไปหมด'
        });
        setShowPopup(true);
      }
    }
  }

  const change = (evt) => {
    setInput(evt.target.value)
  }

  useEffect(()=> {
    const getData = async() =>{
      const res = await axios.get('http://localhost:4000/api/customers')
      setCData(res.data)
    }
    getData()
  },[])

  const renderPopup = showPopup&&(
    <Popup
      topic={pData.topic}
      message={pData.message}
      closeBtn={() => setShowPopup(false)}
    />
  )

  return (
    <>

    <div className="home-container">

      <div className="main-mid-area">
        <div className="src-area">

          <div className="title">
            <h2>Your ID</h2>
          </div>
          <input
            type='text'
            name='text'
            value={input}
            onChange={change}
            placeholder='c000'
            className='main-input' 
          />
          <p>↑ Put Your ID & Press the Search ↓</p>

        </div>

          <div className="b-input-d">
            <div className="l-input-d"></div>
            <div className="r-input-d"></div>
          </div>
          <div className="input-d">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div>
          </div>
          
        <button onClick={search} className="src-btn">

          <div className="src-d">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div>
          </div>
          <div className="b-src-d">
            <div className="l-src-d"></div>
            <div className="r-src-d"></div>
          </div>
          <div className="src-text">
            <span>Search</span>
          </div>

        </button>
      </div>

      <div className="bt-area">

      </div>

      {renderPopup}

    </div>
    
    </>

  )

}

export default FindID