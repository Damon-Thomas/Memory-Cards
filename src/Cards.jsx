import { useEffect, useState } from "react";
import "./cards.css";

function Cards({ difficulty }) {
  const [gifArray, setGifArray] = useState([]);

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
        console.log('copy', array);

        setGifArray([...array]);
      });
  }, []);

  function getGifById(selectedID) {
    let elementPos = gifArray
      .map(function (x) {
        return x.data.id;
      })
      .indexOf(selectedID);

    let objectFound = gifArray[elementPos];

    return [objectFound, elementPos];
  }

  const clickHandler= (e) => {
    const id = e.target.dataset.id
    if (id) {
      console.log(gifArray);
      let gif = getGifById(id);
      console.log(gif[0]);
      if (gif[0]) {
        gif[0].selected = true;
        let array = [...gifArray];
        array[gif[1]] = gif[0];
        setGifArray([...array]);
      }
    }
  }

  // useEffect(() => {
  //   document.addEventListener("click", (event) => {
  //     clickHandler(event);
  //   });

  //   return () =>
  //     document.removeEventListener("click", (event) => {
  //       clickHandler(event);
  //     });
  // }, []);

  function shuffle() {
    let array = [...gifArray];
    var m = array.length,
      t,
      i;

    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  function imgHTML() {
    return (
      <div className="cardContainer" style={{ width: getwidth() }}>
        {/* <img className='card' src={gifArray[0].images.original.url} alt="" /> */}
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
    );
  }

  return imgHTML();
}

export default Cards;
