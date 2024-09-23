import "./setup.css"

function Setup({setSetup, setDifficulty}) {

    function clickHandler(difficulty) {
        setSetup(false)
        setDifficulty(difficulty)
      }
    
  return (
    <div className="setup">
      <button className="difficultyButton" onClick={() => {clickHandler(1)}}>Easy</button>
      <button className="difficultyButton" onClick={() => {clickHandler(2)}}>Medium</button>
      <button className="difficultyButton" onClick={() => {clickHandler(3)}}>Hard</button>
    </div>
  );
}

export default Setup