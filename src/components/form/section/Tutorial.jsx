import { useState,useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import { convertYTLink } from "../../../hook/convertYTLink"
import { FaFileAlt } from "react-icons/fa";

function Tutorial() {
    const { game, handleInputChange } = useOutletContext()
    const [youtube,setYoutube] = useState()

    useEffect(()=>{
        const getYT =async()=>{
            const res = await convertYTLink(game.videoLink)
            setYoutube(res)
        }
        getYT()
    },[game.videoLink, game.docFiles])

    const inputChange =(evt)=>{
        const { name, value } = evt.target
            handleInputChange({[name]:value})
    }

    const docChange =(evt)=>{
        const { name, files } = evt.target
        const docs = Array.from(files)
            handleInputChange({ [name]: docs })
    }

  return (
            <>
                <h2>Tutorial</h2>

                <div className="input-area">
                    <h3> Video Link</h3>
                    <input 
                        type="text" 
                        name="videoLink"
                        value={game.videoLink || ''} 
                        placeholder="Input YouTube Link"
                        onChange={inputChange}
                        className="form-input" 
                    />
                    { game.videoLink&&(<iframe src={youtube} className="v-frame"></iframe>) }
                </div>


                <div className="input-area">
                    <h3> Document Files</h3>
                    <input 
                        type="file" 
                        name="docFiles"
                        multiple
                        onChange={docChange}
                        className="form-input" 
                    />
                    {game.docFiles &&( 
                        <div className="docs-1">
                            {game.docFiles.map((e)=>{
                                return(
                                    <div className="docs-2" key={e._id}>
                                        <div className="docs-3">
                                        <span><FaFileAlt /></span>
                                        </div>
                                        <p className="docs-4">
                                        {e.doc}
                                        </p>
                                    </div>
                                )
                            })}

                        </div>
                    )}
                    
                </div>
            </>
  )
}

export default Tutorial