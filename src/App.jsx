import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios';


function App() {
  const [correctGuesses, setCorrectGuesses] = useState([])
  const [triesLeft, setTriesLeft] = useState(6)
  const [word, setWord] = useState("HANGMAN")
  const [showHint, setShowHint] = useState(false)
  const [maskedWord, setMaskedWord] = useState(() => {
    return word.split('').map(letter => 
      correctGuesses.includes(letter) ? letter : "_").join(" ");
  })
  const [hint, setHint] = useState("This game")
  const [winStatus, setWinStatus] = useState(false)
  const [loseStatus, setLoseStatus] = useState(false)
  const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const row3 = ["Z", "X", "C", "V", "B", "N", "M"];


   

  const getWord = async () => {
    //random words api taken fro https://github.com/mcnaveen/Random-Words-API
    const response = await axios.get('https://random-words-api.vercel.app/word')
    const word = response.data[0].word
    const hint = response.data[0].definition
    setWord(word.toUpperCase())
    console.log(word)
    setHint(hint)
  }

  const handlePlayAgain = () => {
    setCorrectGuesses([])
    setWinStatus(false)
    getWord()
  }

  const handleKeyboardClick = (alphabet) => {
    if (!loseStatus) {
      if (word.includes(alphabet)) {
        setCorrectGuesses([...correctGuesses, alphabet])
      }
      else {
        setTriesLeft(triesLeft - 1)
        if (triesLeft === 0) {
          setLoseStatus(true)
        }
        console.log(triesLeft)
      }
    }
  }


  useEffect(() => {
    // constantly check if winning condition is met
    if (!maskedWord.includes("_")) {
      setWinStatus(true)
    }


    setMaskedWord(() => {
      return word.split('').map(letter => 
        correctGuesses.includes(letter) ? letter : "_").join(" ");
    })

  }, [correctGuesses]);

  useEffect(() => {
    if (triesLeft === 0) {
      setLoseStatus(true)
    }
  }, [loseStatus]);


  return (
    <div className="Container">
      <div className="word-wrapper">
        {!loseStatus && <p className="word">{maskedWord}</p>}
        {loseStatus && <p className="word">{word}</p>}
      </div>
      <div className="keyboard">
        <div className="keyboard-row">
          {row1
          .map((alphabet, index) => 
          <button key={index} onClick={() => {
              handleKeyboardClick(alphabet)
          }}>{alphabet}</button>)}
        </div>
        <div className="keyboard-row">
          {row2
          .map((alphabet, index) => 
          <button key={index} onClick={() => {
              handleKeyboardClick(alphabet)
          }}>{alphabet}</button>)}
        </div>
        <div className="keyboard-row">
          {row3
          .map((alphabet, index) => 
          <button key={index} onClick={() => {
              handleKeyboardClick(alphabet)
          }}>{alphabet}</button>)}
        </div>
      </div>
      {showHint && <div className="hint">{hint}</div>}
      {maskedWord.includes("_") && <button className="play-again" onClick={() => setShowHint(!showHint)}>Hint</button>}
      {!maskedWord.includes("_") && <p className="game-over">You won!</p>}
      {loseStatus && <p className="game-over">You Lose!</p>}
      {(!maskedWord.includes("_") || loseStatus) && <button className="play-again" onClick={handlePlayAgain} >Play Again</button>}
    </div>
  )
}

export default App

