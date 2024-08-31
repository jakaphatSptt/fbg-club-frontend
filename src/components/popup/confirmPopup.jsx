import './popup.css'

export default function ConfirmPopup(props) {
    const {topic,message,cancelBtn,okBtn} = props
  return (
    <div className="popup-overlay">
        <div className="popup">
          <h2 className="pu-topic">{topic}</h2>
          <div className="pu-content">
            <div className='pu-mes'>{message}</div>
          </div>
          <div className="pop-btn-area">
            <button onClick={cancelBtn} className="popup-btn cancel">CANCEL</button>
            <button onClick={okBtn} className="popup-btn ok">OK</button>
          </div>
        </div>
    </div>
  )
}
