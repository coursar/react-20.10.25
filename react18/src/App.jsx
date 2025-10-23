import { useState } from 'react'
import './App.css'
import DataFetchContainer from './07_fetch/DataFetch'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DataFetchContainer/>
    </>
  )
}

export default App
