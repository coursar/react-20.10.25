import { useCallback, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Batching from './01_batching/BatchingInHandlerAsync'
import Filtering from './02_filtering/Filtering'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Filtering/>
    </>
  )
}

export default App
