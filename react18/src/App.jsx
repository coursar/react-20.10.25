import { useCallback, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WorkerUsage from './03_worker/WorkerUsageHW'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <WorkerUsage/>
    </>
  )
}

export default App
