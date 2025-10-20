import { useState } from "react"

const Batching = () => {
    const [value, setValue] = useState(0)
    const [flag, setFlag] = useState(false)

    const handleClick = () => {
        setTimeout(() => {
            // no auto-batching in react 17
            // but in react 18 - auto-batching
            setValue(prev => prev + 1)
            setFlag(prev => !prev)
        }, 200)
    }

    return (
        <>
            <p>{value}, {flag ? 'true' : 'false'}</p>
            <button onClick={handleClick}>Click Me</button>
        </>
    )
}

export default Batching;
