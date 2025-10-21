import { memo } from "react"
import { useDeferredValue } from "react"
import { useMemo } from "react"
import { useTransition } from "react"
import { useRef } from "react"
import { useState } from "react"


const Filtering = () => {
    const [text, setText] = useState('')
    const [filter, setFilter] = useState('')

    const handleChange = (ev) => {
        const {value} = ev.target
        setText(value)
        setFilter(value)
    }

    return (
        <>
            <p>deferred value</p>
            <input value={text} onChange={handleChange} />
            <List filter={filter} />
            {/* Mistake: <List filter={filter} value={text} /> */}
        </>
    )
}

// memo - no effect
const List = ({filter}) => {
    // const num = Number.parseInt(filter, 10) || 0
    const deferredFilter = useDeferredValue(filter)

    const generated = useMemo(() => {
        const els = new Array(1000)
        for(let i = 0; i < els.length; i++) {
            els[i] = <div key={i}>{deferredFilter}</div>
        }
        return els
    }, [deferredFilter])

    const isPending = filter !== deferredFilter

    return (
        <>
            {isPending && 'Pending...'}
            {generated}
        </>
    )
}

export default Filtering
