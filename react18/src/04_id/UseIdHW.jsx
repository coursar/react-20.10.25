import { forwardRef } from "react"
import { useCallback } from "react"
import { useRef } from "react"
import { useId, useState, memo } from "react"

const list = ["Джентльмены", "Унесенные призраками", "1+1", "Побег из Шоушенка", "Форрест Гамп", "Начало", "Унесенные ветром"]

const UseIdHWContainer = () => {
    const [ownState, setOwnState] = useState(0)
    const [value, setValue] = useState("Унесенные")
    const ref = useRef(null)

    // memoized state
    const handleChange = (ev, value) => {
        console.log(ref.current)
        setValue(value)
        console.log(ev.target)
        // ref.current?.blur()
    }

    return (
        <>
            {ownState}
            <InputWhitSuggestions
                ref={ref}
                label="Выберите фильм: "
                value={value}
                onChange={handleChange}
                suggestions={list}
            />
            <button onClick={() => setOwnState(prev => prev + 1)}>Rerender Parent</button>
        </>
    )
}

// key={idx}: stable list

// 1. Business Logic
// 2. Components Library - suggestions - array with unique elements

// TODO: https://consta.design/libs/uikit/components-textfield-stable/dev
//  - onChange: (
//      1. value: string | null,
//      2. params: { e: React.ChangeEvent; id?: string; name?: string }
// ) => void
//  - onFocus: (ev)

// Our implementation:
//  on*(ev, others...)
//  onChange(ev, value)
//  onFocus(ev)

// forwardRef((props, forwardedRef) => {}) React <= 18
const InputWhitSuggestions = forwardRef(({ label, value, onChange, suggestions }, forwardedRef) => {
    const id = useId();

    const handleChange = (ev) => {
        onChange(ev, ev.target.value)
    }
    
    // 1%
    // const els = [];
    // for (const item of suggestions) {
    //     if (item.startsWith('Унесенные')) {
    //         const el = <option key={item} value={item}></option> // React.createElement()
    //         els.push(el)
    //     }
    // }

    return (
        <>
            <label htmlFor={`select_${id}`}>{label}</label>
            <input
                ref={forwardedRef}
                id={`select_${id}`}
                name={`select_${id}`}
                list={`films_${id}`}
                value={value}
                onChange={handleChange}
            />

            <datalist id={`films_${id}`}>
                {/* 99% */}
                {suggestions.map((item) => <option key={item} value={item}></option>)}
                {/* {els} */}
            </datalist>
        </>
    )
})

export default UseIdHWContainer
