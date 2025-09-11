import { useState } from "react"
import "./styles/Dice.css"

function Dice() {
  const [value, setValue] = useState<number | null>(null)

  function rollDice() {
    const randomNumber = Math.floor(Math.random() * 6) + 1
    setValue(randomNumber)
  }

  return (
    <section className="dice-container">
      <div className="dice-card">
        <h2>Dice</h2>
        <div className="dice-face">{value ?? "-"}</div>
        <button onClick={rollDice}>Veereta täringut</button>
      </div>
    </section>
  )
}

export default Dice
