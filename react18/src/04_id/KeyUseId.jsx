import { Component } from "react"
import { useState } from "react"
import { useId } from "react"

const Container = () => {
    const [count, setCount] = useState(0)

    const handleInc = () => {
        setCount(prev => prev + 1)
    }

    const handleDec = () => {
        setCount(prev => prev - 1)
    }

    return (
        <>
            <p>{count}</p>
            <button onClick={handleInc}>+</button>
            <button onClick={handleDec}>-</button>

            <LabelUseId key={count} />
            {/* <LabelClassBased key={count} /> */}
        </>
    )

}

const LabelUseId = () => {
    const id = useId()

    return (
        <>
            <div>
                <label htmlFor={`email-${id}`}>Email address</label>
                <input type="email" id={`email-${id}`} placeholder="name@example.com"></input>
            </div>
        </>
    )

}

// class LabelClassBased extends Component {
//     constructor(props) {
//         super(props)
//         console.log('created')
//         this.state = {value: Date.now()}
//     }

//     render() {
//         return (
//             <>{this.state.value}</>
//         )
//     }
// }


export default Container