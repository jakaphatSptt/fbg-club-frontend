import './popup.css'

export default function resultPopup(props) {
    const {topic,message,p1,p2,p3,result,closeBtn} = props
  return (
    <div className="popup-overlay">
        <div className="popup">
          <h2 className="pu-topic">{topic}</h2>
          <div className="pu-content">
            <p>{message}</p>
            <div>
              {p1}
              {p2}
              {p3}
            </div>
            <div className="pu-re">
              {result}
            </div>
          </div>
          <div className="pop-btn-area">
            <button onClick={closeBtn} className="popup-btn">CLOSE</button>
          </div>
        </div>
    </div>
  )
}
