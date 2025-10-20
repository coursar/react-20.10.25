import { useState } from "react"
import { flushSync } from "react-dom"

const Batching = () => {
    const [value, setValue] = useState(0)
    const [flag, setFlag] = useState(false)

    const handleClick = () => {
        setTimeout(() => {
            // no auto-batching in react 17
            // but in react 18 - auto-batching
            setValue(prev => prev + 1)
            setFlag(prev => !prev)

            // go back to react 17 behaviour
            // flushSync(() => setValue(prev => prev + 1))
            // flushSync(() => setFlag(prev => !prev))
        }, 200)
    }

    return (
        <>
            <p>timeout</p>
            <p>{value}, {flag ? 'true' : 'false'}</p>
            <button onClick={handleClick}>Click Me</button>
        </>
    )
}

export default Batching;
