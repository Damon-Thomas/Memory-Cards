import { useState } from 'react'
import './App.css'
import Cards from './Cards'
import Setup from './Setup'



function App() {

  const [setup, setSetup] = useState(true)
  const [difficulty, setDifficulty] = useState(0)

  function setupHTML() {
    return (
      <Setup setSetup={setSetup} setDifficulty={setDifficulty} ></Setup>
    )
  }

  function gameHTML() {
    return(
      <Cards difficulty={difficulty}></Cards>
    )
  }

  return (
  <div className="main">
    <h1 className="title">Memory Game</h1>
    {setup ? setupHTML() : gameHTML()}
  </div>
)
}

export default App
