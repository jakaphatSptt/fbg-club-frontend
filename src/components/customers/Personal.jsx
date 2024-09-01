import './Personal.css'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import formatTime from '../../hook/formatTime'
import Popup from '../popup/popup'
import Loading from '../popup/loading'

function Personal() {
  const navigate = useNavigate()
  const {id} = useParams();
  const [data,setData] = useState([]);
  const [timeDiff, setTimeDiff] = useState(null);
  const [price,setPrice] = useState({})
  const [showLoading,setShowLoading] = useState(true)
  const [showPopup,setShowPopup] = useState(false)
  const [charge,setCharge] = useState(0);

  const handlePrice = () =>{
    console.log(price)
    setShowPopup(true)
  }

  const handleBack = () =>{
    navigate(-1)
  }

  useEffect(()=>{

    const fetchData = async () => {
      try {
        const customer = await axios.get(`https://fbgc-backend.onrender.com/api/customer/${id}`)
        const prices = await axios.get('https://fbgc-backend.onrender.com/api/prices')
        setData(customer.data)
        setPrice(prices.data[0])
      } catch (error) {
        console.error('error',error)
      } finally{
        setShowLoading(false)
      }
    }

    fetchData();

    if (data.dateB) {
      const startStamp = data.dateB;
      console.log(`dateB=${startStamp}`)
      const intervalId = setInterval(() => {
        const nowStamp = new Date().getTime();
        const diff = Math.round((nowStamp - startStamp) / 1000);

        setTimeDiff(diff);

        let fee = '0';
        if (diff > 1) fee = price.hrs1;
        if (diff > 3600) fee = price.hrs2;
        if (diff > 7200) fee = price.hrs3;
        if (diff > 10800) fee = price.hrs4;
        if (diff > 14400) fee = price.hrs5;
        setCharge(fee);
      }, 1000);

      return ()=> clearInterval(intervalId);
    }

  },[id,data.dateB,price.hrs1,price.hrs2,price.hrs3,price.hrs4,price.hrs5])

  const ft = formatTime(timeDiff)
  const h = timeDiff? ft.split(':')[0]:'--'
  const m = timeDiff? ft.split(':')[1]:'--'
  const s = timeDiff? ft.split(':')[2]:'--'

  const active = data.dateB? 'กำลังใช้งาน':'ไม่ได้ใช้งาน'

  const renderLoading = showLoading&&(
    <Loading/>
  )

  const renderPopup = showPopup&&(
    <Popup
    topic={`ค่าบริการ`}
    message={
      <>
      <div className="pu-3">
        <h3>ชั่วโมงที่ 1</h3>
        <h2>{price.hrs1}</h2>
        <h3>บาท</h3>
      </div>
      <div className="pu-3">
        <h3>ชั่วโมงที่ 2</h3>
        <h2>{price.hrs2}</h2>
        <h3>บาท</h3>
      </div>
      <div className="pu-3">
        <h3>ชั่วโมงที่ 3</h3>
        <h2>{price.hrs3}</h2>
        <h3>บาท</h3>
      </div>
      <div className="pu-3">
        <h3>ชั่วโมงที่ 4</h3>
        <h2>{price.hrs4}</h2>
        <h3>บาท</h3>
      </div>
      <div className="pu-3">
        <h3>5 ชม.ขึ้นไป</h3>
        <h2>{price.hrs5}</h2>
        <h3>บาท</h3>
      </div>
      </>
    }
    closeBtn={()=>{ setShowPopup(false)}}
    />
  )

  return (
    <>
    <div className="personal-container">

      <div className="customer-area">

      <div className="hd-1">
        <h2 className="customer-id">
          {data.cid}
        </h2>
      </div>

      <div className="display-box"> 

        <div className="area-1">
          <h4>{active}</h4>
          <div className="timer">
              <div className="timer_li">
                  <h3> {h} </h3>
                  <p>ชั่วโมง</p>
              </div>
              <div className="space">:</div>
              <div className="timer_li">
                  <h3> {m} </h3>
                  <p>นาที</p>
              </div>
              <div className="space">:</div>
              <div className="timer_li">
                  <h3> {s} </h3>
                  <p>วินาที</p>
              </div>
          </div>
        </div>
        
        <div className="area-2">
          <div className="st-at">
            <h5>ร้าน</h5>
            <p>FeatureBG</p>
            <span>1xx/5x F1 xxxxxx khonkean 40000  </span>

            <div onClick={handlePrice} className="pricePopup">
              <span>อัตราค่าบริการ</span>
            </div>

          </div>
          
          <div className="st-at">
            <h5>เวลาเริ่มต้น</h5>
            <p className="stTimer">{data.startTime} น.</p>
            <span className="stDate">{data.startMDY}</span>

            <div className="rb-1">
              <div className="paid-area">
                <h4 className="paid">ค่าบริการ</h4>
                <div className="charge-area">
                  <span className="bath">฿</span>
                  <div className="charge">{charge}</div>
                </div>
              </div>
              
            </div>
            
          </div>
        </div>

      </div>
      
      <div className="big-dot">
        <div className="l-input"></div>
        <div className="r-input"></div>
      </div>
      <div className="input-dot">
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div>
      </div>

      <div className="bt-box" onClick={handleBack}>

        <div className="src-dot">
          <div></div><div></div><div></div><div></div><div></div><div></div><div></div>
          <div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
        <div className="b-src-dot">
          <div className="l-src"></div>
          <div className="r-src"></div>
        </div>

        <div className="bt-bt" >

          <div className="lb-1">
            <div className="lb-1-back">
              <h3 className='lb-1-2'>PREV</h3>
            </div>
          </div>

        </div>

      </div>

    </div>
    {renderLoading}
    {renderPopup}

    </div>
    </>
  )
}

export default Personal
