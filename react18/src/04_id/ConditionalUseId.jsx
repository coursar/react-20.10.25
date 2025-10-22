import { Component } from "react"
import { useState } from "react"
import { useId } from "react"

const Container = () => {
    const [display, setDisplay] = useState(true)

    const handleClick = () => {
        setDisplay(prev => !prev)
    }

    return (
        <>
            <p>{display ? 'true' : 'false'}</p>
            <button onClick={handleClick}>toggle</button>

            {display && <LabelUseId/>}
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