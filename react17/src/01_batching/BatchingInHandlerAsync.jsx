import { useState } from "react"

const Batching = () => {
    const [value, setValue] = useState(0)
    const [flag, setFlag] = useState(false)
    const [last, setLast] = useState(0)

    const handleClick = async () => {
        setValue(prev => prev + 1)
        setFlag(prev => !prev)

        await Promise.resolve()

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
