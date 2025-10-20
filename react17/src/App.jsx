import { useCallback, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const inc = useCallback(() => setCount(c => c + 1), []);

  return (
    <>
      
    </>
  )
}

export default App
