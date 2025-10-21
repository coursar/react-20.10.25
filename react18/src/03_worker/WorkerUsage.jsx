import { useEffect } from "react"
import { useRef } from "react"

const WorkerUsage = () => {
    // TODO:
    // 1. useEffect: create + remove
    // 2. useRef + useEffect (for handler)

    const workerRef = useRef(null)

    useEffect(() => {
        workerRef.current = new Worker(new URL('./worker.mjs', import.meta.url), {
            type: 'module'
        })

        return () => workerRef.current?.terminate()
    }, [])

    const handleRun = (ev) => {
        workerRef.current?.postMessage({
            type: 'calculate',
            duration: 20_000
        })
    }

    return (
        <>
            Worker
            <button onClick={handleRun}>Run</button>
        </>
    )
}

export default WorkerUsage
