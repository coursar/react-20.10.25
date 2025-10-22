import { useState } from "react"
import { useId } from "react"

const LabelUseId = () => {
    const id = useId()
    const [count, setCount] = useState(0)

    const handleClick = () => {
        setCount(prev => prev + 1)
    }

    return (
        <>
            <div>
                <label htmlFor={`email-${id}`}>Email address</label>
                <input type="email" id={`email-${id}`} placeholder="name@example.com"></input>
            </div>

            <div>
                <input type="checkbox" value="" id={`agreement-${id}`}></input>
                <label htmlFor={`agreement-${id}`}>Default checkbox</label>
            </div>

            <p>{count}</p>

            <button onClick={handleClick}>Click me</button>
        </>
    )

}

export default LabelUseId