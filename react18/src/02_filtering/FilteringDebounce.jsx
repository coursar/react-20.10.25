import { memo } from "react"
import { useRef } from "react"
import { useState } from "react"


const Filtering = () => {
    const [text, setText] = useState('')
    const [filter, setFilter] = useState('')
    // 1. don't rerender
    // 2. save outside component
    const timerIdRef = useRef()

    // TODO: debounce (50 ms)
    // https://rxmarbles.com/#debounceTime
    const handleChange = (ev) => {
        const {value} = ev.target
        setText(value)
        clearTimeout(timerIdRef.current)
        timerIdRef.current = setTimeout(() => {
            setFilter(value)
        }, 1000)
    }

    return (
        <>
            <input value={text} onChange={handleChange} />
            <List filter={filter} />
        </>
    )
}

const List = memo(({filter}) => {
    const num = Number.parseInt(filter, 10) || 0

    const generate = () => {
        const els = new Array(num)
        for(let i = 0; i < els.length; i++) {
            els[i] = <div key={i}>{num}</div>
        }
        return els
    }

    return (
        <>
            {/* bad practice: slow operations in render */}
            {generate()}
        </>
    )
})

export default Filtering
