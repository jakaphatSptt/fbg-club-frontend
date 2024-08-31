//import { useState } from 'react'
import './Container.css'

function Container(props) {
    const {content} = props
    return(
        <>
        <div className='container' >
            {content}
        </div>
        </>
    )
}

export default Container;
/*
{data.map((ccc)=>{
    return <Customer {...ccc} key={ccc.id}/>
})}

*/