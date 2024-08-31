import { Link } from 'react-router-dom'
import "./Boardgames.css"

function DelEdit(props) {
  const {title, gid, delGame } = props

  const handelDel = async()=>{
    delGame(gid,title)
  }

  return (
    <div className="game-btn">
        <Link onClick={handelDel} className="btn-3 del">DEL</Link>
        <Link to={`/game/${gid}/edit/general`} className="btn-3 edit">EDIT</Link>
      </div>
  )
}

export default DelEdit