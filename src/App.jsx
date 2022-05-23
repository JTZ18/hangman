import { useState } from 'react'
import logo from './logo.svg'
import './App.css'


function App() {
  const [correctGuesses, setCorrectGuesses] = useState([]) 
  const word = "HANGMAN";
  const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const row3 = ["Z", "X", "C", "V", "B", "N", "M"];
   

  const maskedWord = word.split('').map(letter => 
  correctGuesses.includes(letter) ? letter : "_").join(" ");


  return (
    <div className="Container">
      <div className="word-wrapper">
        <p className="word">{maskedWord}</p>
      </div>
      <div className="keyboard">
        <div className="keyboard-row">
          {row1
          .map((alphabet, index) => 
          <button key={index} onClick={() => {
              if (word.includes(alphabet)) {
                  setCorrectGuesses([...correctGuesses, alphabet])
              }
          }}>{alphabet}</button>)}
        </div>
        <div className="keyboard-row">
          {row2
          .map((alphabet, index) => 
          <button key={index} onClick={() => {
              if (word.includes(alphabet)) {
                  setCorrectGuesses([...correctGuesses, alphabet])
              }
          }}>{alphabet}</button>)}
        </div>
        <div className="keyboard-row">
          {row3
          .map((alphabet, index) => 
          <button key={index} onClick={() => {
              if (word.includes(alphabet)) {
                  setCorrectGuesses([...correctGuesses, alphabet])
              }
          }}>{alphabet}</button>)}
        </div>
      </div>
      {!maskedWord.includes("_") && <p className="game-over">You won!</p>}
    </div>
  )
}

export default App

