import { useOutletContext } from "react-router-dom"
import Select from 'react-select'

export default function General() {
    const { game, handleInputChange, } = useOutletContext()

    const inputChange =(evt)=>{
        const { name, value } = evt.target
        handleInputChange({[name]:value})
    }

    const selectChange = (evt) => {
        const evtTags = evt ? evt.map(e => ({ tag: e.value })) : [];
        handleInputChange({ tags: evtTags });
    };

    const selectValues = game.tags? game.tags.map(e => ({ value: e.tag, label: e.tag })) :[];

    const options = [
        { value: "casual", label: "casual" },
        { value: "tactics", label: "tactics" },
        { value: "strategy", label: "strategy" },
        { value: "cooperate", label: "cooperate" },
        { value: "bluffing", label: "bluffing" },
        { value: "role-play", label: "role-play" },
        { value: "turn-based", label: "turn-based" },
        { value: "card-game", label: "card-game" },
        { value: "medieval", label: "medieval" },
        { value: "fantasy", label: "fantasy" },
        { value: "investigate", label: "investigate" },
    ]

    const tagsStyle = {
        control:(styles)=>({
            ...styles,
            border:'1px solid transparent',
            borderRadius: '10px',
            background: 'var(--bg-color)'
        }),
        menu:(styles)=>({
            ...styles,
        }),
        option:(styles)=>({
            ...styles,
        }),
        multiValue: (styles,) => ({
            ...styles, 
        })
    }

    return(
        <>
            <h2>General</h2>

            <div className="input-area">
                <h3> Title</h3>
                <input 
                    type="text" 
                    name="title"
                    value={game.title || ''}
                    onChange={inputChange} 
                    className="form-input"
                />
            </div>

            <div className="input-area">
                <h3> Community</h3>
                <input 
                    type="text" 
                    name="community"
                    value={game.community || ''}
                    onChange={inputChange}
                    className="form-input"
                />
            </div>

            <div className="input-area">
                <h3> Playing Time</h3>
                <input 
                    type="text" 
                    name="playingTime" 
                    value={game.playingTime || ''}
                    onChange={inputChange}
                    className="form-input"
                />
            </div>
        
            <div className="input-area">
                <h3> Price</h3>
                <input 
                    type="number" 
                    name="price"
                    value={game.price || ''} 
                    onChange={inputChange}
                    className="form-input" 
                />
            </div>

            <div className="input-area">
                <h3> Content</h3>
                <input 
                    type="text" 
                    name="content" 
                    value={game.content || ''}
                    onChange={inputChange}
                    className="form-input"
                />
            </div>

            <div className="input-area">
                <h3> Tags </h3>
                <Select 
                    isMulti
                    name="tags" 
                    value={selectValues}
                    options={options}
                    onChange={selectChange}
                    styles={tagsStyle}
                />
            </div>

        </>
    )
}