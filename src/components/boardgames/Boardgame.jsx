import { useState, useEffect } from 'react';
import { Link,useParams } from 'react-router-dom';
import axios from 'axios';
import { HiUsers } from "react-icons/hi";
import { IoMdTime } from "react-icons/io";
import { IoDocumentTextSharp } from "react-icons/io5";
import { AiFillFileExcel } from "react-icons/ai";
import './Boardgame.css'
import Loading from '../popup/loading';
import { convertYTLink } from '../../hook/convertYTLink';

function BoardGame() {
  const [ game, setGame ] = useState({
    title:'', community:'', playingTime:'', tags:[{ tag: null }], price:'', content:'', 
    logo:'', boxes:'', banner:'', videoLink:'', docFiles:[{ doc: null }]
  })
  const [ youtube,setYoutube ] = useState('')
  const [ loading,setLoading ] = useState(true)
  const { id } = useParams()

  // const getImages =async()=>{
  //   try {
  //     const res = await 
  //   } catch (error) {
  //     console.error('error',error)
  //   }
  // }

  useEffect(()=>{
    const fetchData = async () =>{
      try {
        const res = await axios.get(`http://localhost:4000/api/boardgame/${id}`)
        const gameData = res.data[0]
        setGame(gameData)
      } catch (error) {
        console.error('error',error)
      } finally{
        setLoading(false)
      }
    }
    fetchData()
      const getYT = async()=>{
        const res = await convertYTLink(game.videoLink)
        setYoutube(res)
      }
      getYT()

  },[id,game.videoLink])

  const gameTags = game.tags.map((e)=>{
    return <p className='g-tag' key={e._id}> {e.tag} </p>
  })

  console.log(game.logo)

  const logo = `http://localhost:4000/upload/images/${game.logo}`
  const boxes = `http://localhost:4000/upload/images/${game.boxes}`
  const banner = `http://localhost:4000/upload/images/${game.banner}`

  console.log(youtube)

  return (
    <div 
      className="g-detail-space" 
      style={{backgroundImage:`var(--banner-color2), url(${banner})`}} 
    >
    
      <div className="g-banner">

        <div className="gd-top">
          <div className="gd-l">
            <img
            className="gd-logo" 
            src={logo}
             />
          </div>

          <div className="gd-r">

            <div className="tag-area">
              <h3>Tags:</h3>
              {gameTags}
            </div>

            <div className="gd-r1">
              <div className='gd-r2'>
                <HiUsers />
                <p> {game.community} Player</p>
              </div>
              <div className='gd-r2'>
                <IoMdTime />
                <p> {game.playingTime} Mins</p>
              </div>
            </div>
          <h3>{game.content}</h3>

          </div>
        </div>

        <div className="gd-mid">

          <div className="gd-md-1">
            <img src={boxes} className="gd-boxes-img" />
            <div className="gd-in-fo">
              <h4 > {game.title}</h4>
              <h5> Price</h5>
              <h5>{game.price} bath</h5>
            </div>
          </div>

          <div className="gd-md-2">
            <h2>Docs</h2>

            {game.docFiles.length !== 0? 
              game.docFiles.map((e)=>{
              const file = `http://localhost:4000/upload/document/${e.doc}`
              return(
                <Link to={file} download={e.doc} className='gd-doc' key={e._id} >
                  <div className='gd-doc-icon'>
                    <span><IoDocumentTextSharp /></span> 
                  </div>
                  <div className='gd-doc-text'  >{e.doc}</div>
                </Link>
              )})
              :
              <div className='gd-doc' onClick={()=> console.log(game.docFiles)}> 
                <div className='gd-doc-icon'>
                  <span><AiFillFileExcel /></span> 
                </div>
                <div className='gd-doc-text'  > None </div>
              </div>
            }

          </div>

          <div className="gd-md-2">
            <h2>Video</h2>
            {game.videoLink&&(<iframe src={youtube} className='gd-video' allow="fullscreen" ></iframe>)}
          </div>

        </div>

      </div>

      {loading&&( <Loading/> )}

    </div>
  
  )
}

export default BoardGame