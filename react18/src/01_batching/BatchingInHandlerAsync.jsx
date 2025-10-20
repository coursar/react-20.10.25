import { useState } from "react"

const Batching = () => {
    const [value, setValue] = useState(0)
    const [flag, setFlag] = useState(false)
    const [last, setLast] = useState(0)

    // react 17: 3 render
    // react 18: 2 render
    const handleClick = async () => {
        setValue(prev => prev + 1)
        await Promise.resolve()
        // in react 18 -> batching
        // in react 17 -> no batching
        setFlag(prev => !prev)
        setLast(prev => prev + 1)
    }

    return (
        <>
            <p>handler async</p>
            <p>{value}, {flag ? 'true' : 'false'}, {last}</p>
            <button onClick={handleClick}>Click Me</button>
        </>
    )
}

export default Batching;
