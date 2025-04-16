import { useState } from 'react'
import './App.css'
import MenuPage from './pages/MenuPage/MenuPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <MenuPage />
  </div>
  )
}

export default App
