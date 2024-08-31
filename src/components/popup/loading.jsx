import './loading.css'

export default function loading() {
  return (
    <div className='loading-overlay'>
        <div className="load-po">
           <div className="loading"></div>
           <h2 className='loading-text'>Loading...</h2>
        </div>
    </div>
  )
}
