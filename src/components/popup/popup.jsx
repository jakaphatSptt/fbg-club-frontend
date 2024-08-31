import './popup.css'

export default function popup(props) {
    const {topic,message,closeBtn} = props
  return (
    <>
    <div className="popup-overlay">
        <div className="popup">
            <h2 className="pu-topic">{topic}</h2>
            <div className="pu-content">
              <div className='pu-mes'>{message}</div>
            </div>
            <div className="pop-btn-area">
              <button onClick={closeBtn} className="popup-btn close">CLOSE</button>
            </div>
        </div>
    </div>
    </> 
  )
}
