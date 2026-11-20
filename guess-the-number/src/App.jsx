import "./index.css";
import "./App.css";
import { useState } from "react";

function App()
{
  const [secretNumber, setSecretNumber] = useState(Math.floor(Math.random() * 100) + 1)
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  function handleRestart()
  {
    setSecretNumber(Math.floor(Math.random() * 100 + 1));
    setGuess("");
    setMessage("");
    setAttempts(0);
    setGameOver(false);
  }

  function handleGuess()
  {
    if (gameOver)
    {
      return;
    }

    if (guess === "")
    {
      setMessage("Please enter a number!");
      return;
    }

    if (Number(guess) < 1 || Number(guess) > 100)
    {
      setMessage("Number out of range!");
      return;
    }

    if (Number(guess) == secretNumber)
    {
      setMessage("Correct! You won!");
      setAttempts(attempts + 1);
      setGameOver(true);

      return;
    }
    else
    {
      setAttempts(attempts + 1);

      if (attempts >= 9)
      {
        setGameOver(true);
        setMessage("Game over");
        
        return;
      }

      setMessage(Number(guess) > secretNumber ? "Too high!" : "Too low");
    }    
  }

  return (
    <div className = "game-container">
      <h1>Guess the number</h1>
      <p>I'm thinking of a number between 1 and 100</p>

      <div className = "game-input">
        <input 
          id = "input-number"
          type = "number" 
          placeholder = "Enter your number"
          value = {guess}
          onChange = {(event) => setGuess(event.target.value)}
        />

        <button onClick = {handleGuess} disabled = {gameOver}>Guess</button>
      </div>

      <p>{message}</p>

      <p>Attempts: {attempts}</p>

      <button id = "restart-btn" onClick={handleRestart}>restart</button>
    </div>
  )
}

export default App;