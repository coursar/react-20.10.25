import { useState } from "react"
import { useId } from "react"

const FormUseId = () => {
    const id = useId()
    const [count, setCount] = useState(0)

    const handleSubmit = (ev) => {
        ev.preventDefault()
        debugger
        console.log('submit')
    }

    return (
        <>
            <form id={id} onSubmit={handleSubmit}>
                <input name="text"></input>
            </form>

            <input form={id} name="outer"></input>
            <button type="submit" form={id}>Click me</button>
        </>
    )

}

export default FormUseId