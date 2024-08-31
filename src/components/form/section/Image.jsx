import noImg from '../../../../public/no_image-removebg-preview.png'
import { useOutletContext } from "react-router-dom"

function Image() {
    const { previews, handlePreviewChange, handleInputChange } = useOutletContext()


    const fileChange =(evt)=>{
        const { name, files } = evt.target
        const file = files[0]
        if(files && files[0]){
            handlePreviewChange({ [name]: URL.createObjectURL(file)})
            handleInputChange({ [name]:file })
        }
    }

    return (
        <>
            <h2>Image</h2>

            <div className="fr-zone-2">
                <div className="fr-zl">
                    <h3>Logo</h3>
                    <img src={ previews.logo || noImg } className="img-ex" />
                    <input 
                        type="file" 
                        name="logo"
                        accept="image/*"
                        onChange={fileChange}
                        className="img-input" 
                    />
                </div>

                <div className="fr-zl">
                    <h3>Boxes</h3>
                    <img src={previews.boxes || noImg } className="img-ex" />
                    <input 
                        type="file" 
                        name="boxes"
                        accept="image/*"
                        onChange={fileChange}
                        className="img-input"
                    />
                </div>
            </div>

            <div className="fr-zl">
                <h3>Banner</h3>
                <img src={previews.banner || noImg } className="banner-ex" />
                <input 
                    type="file" 
                    name="banner" 
                    accept="image/*"
                    onChange={fileChange}
                    className="img-input"  
                />
            </div>


        </>
  )
}

export default Image