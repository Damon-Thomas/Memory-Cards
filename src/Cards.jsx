import { useEffect, useState } from "react"
import "./cards.css"


function Cards() {

const [gifArray, setGifArray] = useState([])

  useEffect(() => {
  const apiResults = fetch('https://api.giphy.com/v1/gifs/search?api_key=91AXJMJcXuZNmgJ7Veh8VpLBfckc1fq3&q=The+office+show&limit=8&offset=0&rating=g&lang=en&bundle=messaging_non_clips', {mode: 'cors'})
  .then(function(response) {
    console.log('called')
    return response.json()})
    .then(function(response)
  {
    console.log('data', response.data)
    setGifArray(response.data)
  })},[])


  function imgHTML() {
    console.log('start array', gifArray)
    return(
      <div className="cardContainer">
        {/* <img className='card' src={gifArray[0].images.original.url} alt="" /> */}
        {gifArray.map(card => (
          
          <img className="card" key={card.id} src={card.images.original.url} ></img>
        ))}
      </div>
    )
    
  }
        
    
  
  

  return (
    
    imgHTML()
      
  )}

  export default Cards