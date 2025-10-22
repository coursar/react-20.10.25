import { useState } from 'react'
import './App.css'
import Container from './04_id/ConditionalUseId'
import StateOrder from './04_id/StateOrder'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <StateOrder/>
    </>
  )
}

export default App
