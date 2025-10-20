import { useState } from "react"

const Filtering = () => {
    const [filter, setFilter] = useState('')

    // TODO: debounce (50 ms)
    // https://rxmarbles.com/#debounceTime
    const handleChange = (ev) => {
        const {value} = ev.target;
        setFilter(value)
    }

    return (
        <>
            <input onChange={handleChange} />
            <List filter={filter} />
        </>
    )
}

const List = ({filter}) => {
    const num = Number.parseInt(filter, 10) || 0

    // 1000
    const generate = () => {
        const els = new Array(num)
        for(let i = 0; i < els.length; i++) {
            els[i] = <div key={i}>{num}</div>
        }
        return els
    }

    return (
        <>
            {generate()}
        </>
    )
}

export default Filtering
