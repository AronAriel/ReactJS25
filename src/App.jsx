import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const items = ["Aron", "Maksim", "Nick", "Damir"];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>List of Names</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
