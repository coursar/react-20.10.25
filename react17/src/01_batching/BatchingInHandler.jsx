import { useState } from "react"

const Batching = () => {
    const [value, setValue] = useState(0)
    const [flag, setFlag] = useState(false)

    const handleClick = () => {
        setValue(prev => prev + 1)
        setFlag(prev => !prev)
    }

    return (
        <>
            <p>{value}, {flag ? 'true' : 'false'}</p>
            <button onClick={handleClick}>Click Me</button>
        </>
    )
}
