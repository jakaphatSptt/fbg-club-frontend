import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './CustomerManage.css'
//import DataContext from '../../data/DataContexst'
import formatTime from '../../hook/formatTime'

function CustomerManage (props) {
    const {_id,cid,dateB, getDate, clearDate} = props
    const [timeDiff,setTimeDiff] = useState([])
    const [charge, setCharge] = useState('0')
    const [price,setPrice] = useState({})

    useEffect(()=>{
        const getPrice = async()=>{
            try {
                const res = await axios.get('https://fbgc-backend.onrender.com/api/prices')
                setPrice(res.data[0])
            } catch (error) {
                console.error('error', error)
            }
        }
        getPrice()
        const runTimer = () => {
            if(dateB === 0){
                setTimeDiff(0)
            }else{
                const nowStamp = new Date().getTime()
                const diff = Math.round((nowStamp - dateB)/1000)
                setTimeDiff(diff)
                //setCharge(chargeCalculator(diff))
                let charge = 0
                if(diff > 1) charge = price.hrs1
                if(diff > 3600) charge = price.hrs2
                if(diff > 7200) charge = price.hrs3
                if(diff > 10800) charge = price.hrs4
                if(diff > 14400) charge = price.hrs5
                setCharge(charge)
            }
        }
        const timeCount = setInterval(runTimer, 1000)
        return () => clearInterval(timeCount)
        
    },[_id, dateB, price.hrs1, price.hrs2, price.hrs3, price.hrs4, price.hrs5])

    const toggle = dateB===0? getDate:clearDate
    const text = dateB===0? 'NONE':'PLAYING'
    const classB = dateB===0? 'startDate':'clearDate'
    const active = dateB===0? null:'playing'

    const ft = formatTime(timeDiff)
    //const [h, m, s] = ft.split(':').map(t => t || '--')
    const h = timeDiff? ft.split(':')[0]:'00'
    const m = timeDiff? ft.split(':')[1]:'00'
    const s = timeDiff? ft.split(':')[2]:'00'

    const pad = (num) => String(num).padStart(2,'0');
    const dateC = new Date(dateB)
    const [sh,sm] = [ pad(dateC.getHours()), pad(dateC.getMinutes()) ]

    return(
    <div className="customers-list">

        <div className="customers-list-2">
            
            <div className="cs-frame">
                <div className="id">
                    <div className={`id-icon ${active}`}></div>
                    <Link to={`/customer/${cid}`} className="id-number">
                        {cid}
                    </Link>
                </div>

                <div className="start-time">
                    <h4 className="st-date">START: {dateB? `${sh}:${sm}`:null }</h4>
                </div>
                
                <div className="display">
                    <h4 className={`di-ti`}>PLAYTIME:</h4>
                    <div>{h}:{m}:{s}</div>
                </div>
                
                <div className="display">
                    <h4 className="di-ti">SERVICE CHARGE:</h4>
                    <div><span className='sym'>฿</span>{charge} </div>
                </div>
            </div>

            <div onClick={toggle} className={`set-btn ${classB}`}>
                <span>{text}</span>
            </div>

        </div>

    </div>
    )
}

export default CustomerManage