import { useEffect, useState } from "react";
import "./cards.css";

function Cards({ difficulty }) {
  const [gifArray, setGifArray] = useState([]);
  const [highScore, setHighScore] = useState(0)
  const [gameover, setGameover] = useState(false)
  const possibleScore = gifArray.length
  const currentScore = () => {
    let count = 0
    gifArray.forEach(element => {
      if(element.selected === true){
        count++
      }
    });
    if (count > highScore) {
      setHighScore(count)
    }
    return count
  }
 

  function getDifficulty() {
    if (difficulty === 1) {
      return "8";
    } else if (difficulty === 2) {
      return "12";
    } else if (difficulty === 3) {
      return "20";
    } else {
      console.log("difficulty error");
      return "8";
    }
  }

  function getwidth() {
    if (difficulty === 1 || difficulty === 2) {
      return "49em";
    } else if (difficulty === 3) {
      return "59em";
    } else {
      return "49em";
    }
  }

  useEffect(() => {
    
    setGameover(false)
    const apiResults = fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=91AXJMJcXuZNmgJ7Veh8VpLBfckc1fq3&q=The+office+show&limit=${getDifficulty()}&offset=0&rating=g&lang=en&bundle=messaging_non_clips`,
      { mode: "cors" }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        let array = [];
        response.data.forEach((element) => {
          array.push({ data: element, selected: false });
        });
        setGifArray([...array]);
      });
  }, [gameover]);

  function getGifById(selectedID) {
    let elementPos = gifArray
      .map(function (x) {
        return x.data.id;
      })
      .indexOf(selectedID);

    let objectFound = gifArray[elementPos];

    return [objectFound, elementPos];
  }

  function checkGameOver() {
    
    if(currentScore() === possibleScore){
      
      gameOver()}
  }

  function gameOver() {
    
    setGameover(true)
  }

  const clickHandler = (e) => {
    const id = e.target.dataset.id
    if (id) {
      let gif = getGifById(id);
      if (gif[0]) {
        if (gif[0].selected) {
          
          gameOver()
        }
        else {
        gif[0].selected = true;
        let array = [...gifArray];
        array[gif[1]] = gif[0];
        setGifArray([...array]);
        checkGameOver()
        }
      }
    }
  }

 

  function shuffle() {
    let array = [...gifArray];
    var m = array.length,
      t,
      i;

    while (m) {
      
      i = Math.floor(Math.random() * m--);

      
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  function imgHTML() {
    return (
      <div className="gameSpace">
        <div className="statContainer">
          <div className="highScoreContainer">
            <h6 className="statTitle">Highscore: </h6>
            <p className="statText">{highScore}</p>
          </div>
          <div className="currentScoreContainer">
            <h6 className="statTitle">Current Score: </h6>
            <p className="statText">{currentScore() + " out of " + possibleScore}</p>
          </div>
        </div>
        <div className="cardContainer" style={{ width: getwidth() }}>
         
          {shuffle().map((card) => (
            <img
              onClick={clickHandler}
              className={"card " + card.data.id}
              key={card.data.id}
              src={card.data.images.original.url}
              data-id={card.data.id}
            ></img>
          ))}
        </div>
      </div>
    );
  }

  return imgHTML();
}

export default Cards;
