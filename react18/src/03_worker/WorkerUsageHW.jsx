import { useState } from "react"
import { useEffect } from "react"
import { useRef } from "react"

const WorkerUsage = () => {
    const [isPending, setPending] = useState(false)
    const [workerResult, setWorkerResult] = useState({
        percent: 0,
        top10: [],
    })
    // TODO:
    // 1. useEffect: create + remove
    // 2. useRef + useEffect (for handler)
    /** @type { {current: Worker | null} } */
    const workerRef = useRef(null)

    useEffect(() => {
        workerRef.current = new Worker(new URL('./worker-hw.mjs', import.meta.url), {
            type: 'module'
        })

        workerRef.current.addEventListener('message', (ev) => {
            const {type, data} = ev.data
            console.log(data)

            switch(type) {
                case 'progress':
                    // TODO: debounce
                    // TODO: state with objects
                    setWorkerResult(data)
                    break
                case 'complete':
                    setPending(false)
                    setWorkerResult(data)
                    break
            }
        })

        return () => workerRef.current?.terminate()
    }, [])

    const handleChange = async (ev) => {
        // File -> arrayBuffer()
        /** @type {ArrayBuffer} */
        const buffer = await ev.currentTarget.files[0].arrayBuffer()
        console.log(buffer)

        workerRef.current?.postMessage({
            type: 'calculate',
            data: buffer
        }, [buffer]) // transferable
        setPending(true)
    }

    return (
        <>
            {isPending && 'calculating....'}
            <p>Percent: {workerResult.percent}</p>
            <div>
                {workerResult.top10.map(o => <div key={o.byte}>{o.byte}: {o.count}</div>)}
            </div>
            <input onChange={handleChange} type="file" name="" id="" />
        </>
    )
}

export default WorkerUsage
