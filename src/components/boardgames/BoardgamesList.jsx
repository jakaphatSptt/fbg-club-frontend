import './Boardgames.css'
import { Link } from 'react-router-dom';
import { HiUsers } from "react-icons/hi";
import { IoMdTime } from "react-icons/io";

function Boardgames(props) {
    const { gid, title, community, playingTime, tags, logo, banner, manage} = props

    const gameTags = tags.map((e)=>{
        return <div className="tags" key={e._id}>{e.tag}</div>
    })

    const gameLogo = `http://localhost:4000/upload/images/${logo}`
    const gameBanners = `http://localhost:4000/upload/images/${banner}`

  return (
    <div className="games-list">
        <div className="games-list-2">

            <div className="game-frame fx-col g-wh">
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

            <Link to={`/game/${gid}`} className="bt-frame">CLICKS</Link>

            { manage }

        </div>

    </div>
  )
}

export default Boardgames