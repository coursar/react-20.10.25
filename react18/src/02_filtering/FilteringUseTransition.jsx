import { memo } from "react"
import { useTransition } from "react"
import { useRef } from "react"
import { useState } from "react"


const Filtering = () => {
    const [text, setText] = useState('')
    const [filter, setFilter] = useState('')
    const [isPending, startTransition] = useTransition()

    const handleChange = (ev) => {
        const {value} = ev.target
        setText(value)
        startTransition(() => {
            setFilter(value)
        })
    }

    // TODO:
    // 1. props -> updates delayed:
    //   text - 1, filter - 1
    //   text - 12, filter - 1 (reused old value) -> List not rerendered
    //   text - 123, filter - 1 (reused old value) -> List not rerendered
    //   ...
    //   text - 123, filter - 123
    // 2. with value props Mistake: <List filter={filter} value={text} />
    //   text - 1, filter - 1, value - 1
    //   text - 12, filter - 1 (reused old value), value - 12 -> List rerendered
    //   text - 123, filter - 1 (reused old value), value = 123 -> List rerendered
    //   ...
    //   text - 123, filter - 123
    return (
        <>
            <input value={text} onChange={handleChange} />
            {isPending && 'Pending...'}
            <List filter={filter} />
            {/* Mistake: <List filter={filter} value={text} /> */}
        </>
    )
}

const List = memo(({filter}) => {
    // const num = Number.parseInt(filter, 10) || 0

    const generate = () => {
        const els = new Array(1000)
        for(let i = 0; i < els.length; i++) {
            els[i] = <div key={i}>{filter}</div>
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
