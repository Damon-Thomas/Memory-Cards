import { useState } from 'react'
import './App.css'
import Cards from './Cards'
import Setup from './Setup'



function App() {

  const [setup, setSetup] = useState(true)
  const [difficulty, setDifficulty] = useState(0)

  function setupHTML() {
    console.log('in setup')

    
    return (
      <Setup setSetup={setSetup} setDifficulty={setDifficulty} ></Setup>
    )
  }

  function gameHTML() {
    console.log('in game')
    console.log(setup, difficulty)
    return(
      <Cards></Cards>
    )
  }

  return (
  <div className="main">
    {setup ? setupHTML() : gameHTML()}
  </div>
)
}

export default App
