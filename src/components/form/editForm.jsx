import { useState, useEffect } from 'react'
import { NavLink, Outlet, useOutletContext, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './form.css'
import General from './section/General'
import Image from './section/Image'
import Tutorial from './section/Tutorial'
import Popup from '../popup/popup'
import Success from '../popup/success'

function EditForm() {
  const {id} = useParams();
  const navigate = useNavigate()
  const [ game, setGame ] = useState({
   title:'', community:'', playingTime:'', tags:[], price:'', content:'', 
   logo:null, boxes:null, banner: null, videoLink:'', docFiles:[]
  })
  const [ previews, setPreviews ] = useState({ logo:null, boxes:null, banner: null, videoLink:'', docFiles:[] })
  const [ popup,setPopup ] = useState(false)

  useEffect(()=>{
    const getGame =async()=>{
      try {
        const res = await axios.get(`https://fbgc-backend.onrender.com/api/boardgame/${id}`)
        setGame(res.data[0])
        setPreviews({
          logo: `https://fbgc-backend.onrender.com/uploads/images/${res.data[0].logo}`,
          boxes: `https://fbgc-backend.onrender.com/uploads/images/${res.data[0].boxes}`,
          banner: `https://fbgc-backend.onrender.com/uploads/images/${res.data[0].banner}`
        })
      } catch (error) {
        console.error('error',error)
      }
    }
    getGame()
  },[id])

  const handleInputChange =(newData)=>{
    setGame(prevGame =>({
      ...prevGame,
      ...newData
    }))
  }

  const handlePreviewChange =(newData)=>{
    setPreviews(prevPreview =>({
      ...prevPreview,
      ...newData
    }))
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const handleSubmit =async(evt)=>{
    evt.preventDefault()

    const url = `https://fbgc-backend.onrender.com/api/game/${id}/update`
    const form = new FormData()
    const config = { headers: { 'content-type': 'multipart/form-data' }}
    
    form.append('title', game.title || '');
    form.append('community', game.community || '');
    form.append('playingTime', game.playingTime || '');
    form.append('price', game.price || '');
    form.append('content', game.content || '');
    form.append('videoLink', game.videoLink || '');
    
    form.append('logo', game.logo || null);
    form.append('boxes', game.boxes || null);
    form.append('banner', game.banner || null);

    form.append('tags', game.tags.map(e=> e.tag) || '');

    game.docFiles.forEach(file => { form.append('docFiles', file) });

    try {
      const res = await axios.patch( url, form, config )
      console.log('game created success', res.data)
    } catch (error) {
      console.error('Error creating game:', error);
    }
    setPopup(true)
  }

  return (
    <>
    <div className="form-container">

        <div className="nav-area">
            <NavLink to='general' className='nav-li'>General</NavLink>
            <NavLink to='image' className='nav-li'>Image</NavLink>
            <NavLink to='tutorial' className='nav-li'>Tutorial</NavLink>
        </div>  

        <div className="form-area">
          <section  className="form-sec ">

            <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="fr-zone" >
              <Outlet context={{ game, handleInputChange, previews, handlePreviewChange }}/>

              <div className="form-btn-area">
                <button type="submit" className="form-btn" > SAVE </button>
              </div>

            </form>

          </section>
            
        </div>

        {popup&&(<Popup 
                    topic={< Success text={`updated`.toUpperCase()} />}
                    message={<h2>{`${game.title}`}</h2>}
                    closeBtn={()=> {setPopup(false),navigate('/admin/games')}}
                />)}

    </div>
    </>
  )
}

function FormGeneralB(){
  const { game, handleInputChange } = useOutletContext()
  return <General 
            game={game} 
            handleInputChange={handleInputChange} 
         />
}

function FormImageB(){
  const { previews, handlePreviewChange, handleInputChange } = useOutletContext()
  return <Image 
            previews={previews}
            handlePreviewChange={handlePreviewChange} 
            handleInputChange={handleInputChange}
          />
}

function FormTutorialB(){
  const { game, handleInputChange, previews, handlePreviewChange } = useOutletContext()
  return  <Tutorial 
            game={game}
            handleInputChange={handleInputChange}
            previews={previews}
            handlePreviewChange={handlePreviewChange} 
          />
}

export { EditForm, FormGeneralB , FormImageB, FormTutorialB }
