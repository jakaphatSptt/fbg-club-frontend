import { useState } from 'react'
import { NavLink, Outlet, useOutletContext, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './form.css'
import General from './section/General'
import Image from './section/Image'
import Tutorial from './section/Tutorial'
import Popup from '../popup/popup'
import Success from '../popup/success'

function CreateForm() {
  const navigate = useNavigate()
  const [ game, setGame ] = useState({
    title:'newGame', community:'', playingTime:'', tags:[], price:'', content:'', 
    logo:null, boxes:null, banner:null, videoLink:'', docFiles:[]
   })
   const [ previews, setPreviews ] = useState({ logo:null, boxes:null, banner: null, videoLink:'', docFiles:[] })
  const [ popup,setPopup ] = useState(false)

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
      event.preventDefault(); // ป้องกันการ submit ฟอร์มเมื่อกด Enter
    }
  };

  const handleSubmit =async(evt)=>{
    evt.preventDefault()

    const url = 'http://localhost:4000/api/create/new-game'
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
      const res = await axios.post( url, form, config )
      console.log('game created success', res.data)
    } catch (error) {
      console.error('Error creating game:', error);
    }
    setPopup(true)

  }

  return (
    
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
                    topic={< Success text={`created`.toUpperCase()} />}
                    message={<h2>{`${game.title}`}</h2>}
                    closeBtn={()=> {setPopup(false),navigate('/admin/games')}}
                />)}

    </div>
    
  )
}

function FormGeneralA(){
  const { game, handleInputChange } = useOutletContext()
  return <General 
            game={game} 
            handleInputChange={handleInputChange} 
         />
}

function FormImageA(){
  const { previews, handlePreviewChange, handleInputChange } = useOutletContext()
  return <Image 
            previews={previews}
            handlePreviewChange={handlePreviewChange} 
            handleInputChange={handleInputChange}
          />
}

function FormTutorialA(){
  const { game, previews, handlePreviewChange, handleInputChange } = useOutletContext()
  return <Tutorial 
            game={game} 
            previews={previews}
            handlePreviewChange={handlePreviewChange}
            handleInputChange={handleInputChange} 
          />
}

export { CreateForm, FormGeneralA , FormImageA, FormTutorialA }