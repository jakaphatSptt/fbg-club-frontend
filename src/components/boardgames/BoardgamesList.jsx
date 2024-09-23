import './Boardgames.css'
import { useNavigate } from 'react-router-dom';
import { HiUsers } from "react-icons/hi";
import { IoMdTime } from "react-icons/io";

function Boardgames(props) {
    const { gid, title, community, playingTime, tags, logo, banner } = props

    const navigate = useNavigate()

    const gameTags = tags.map((e)=>{
        return <div className="tags" key={e._id}>{e.tag}</div>
    })

    const gameLogo = `${logo}`
    const gameBanners = `${banner}`

  return (
    <div className="games-list">
        <div className="games-list-2">

            <div onClick={()=> navigate(`/game/${gid}`)} className="game-frame">
                <div className="game-id" 
                     style={ {backgroundImage:`var(--banner-color), url(${gameBanners})`} }>
                    <img src={gameLogo} className="img-logo" alt="game-logo" />
                </div>
                <h4 className="g-title">
                    {title}
                </h4>
                <div className="g-mid">
                    <div className="sm-2"><HiUsers />
                    {community} Players
                    </div>
                    <div className="sm-2"><IoMdTime />
                    {playingTime} Mins
                    </div>
                    <div className="g-tags">
                        {gameTags}
                    </div>
                </div>
                
            </div>
        </div>

    </div>
  )
}

export default Boardgames