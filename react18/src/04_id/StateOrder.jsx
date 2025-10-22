import { useState } from "react"

const StateOrder = () => {
    const [val, setVal] = useState(true)

    if (val) {
        const [first, setFirst] = useState(1) // mount write [1] = 1
        const [second, setSecond] = useState(2) // mount write [2] = 2
        console.log(first, second)
    } else {
        const [second, setSecond] = useState(2) // update memoized read [1] = 1
        const [first, setFirst] = useState(1) // update memoized read [2] = 2
        console.log(first, second)
    }

    const handleClick = () => {
        setVal(prev => !prev)
    }

    return (
        <>
            {val ? 'true' : 'false'}
            <button onClick={handleClick}>toggle</button>
        </>
    )

}

export default StateOrder