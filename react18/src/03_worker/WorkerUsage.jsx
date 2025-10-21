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

        workerRef.current.postMessage('message')

        return () => workerRef.current?.terminate()
    }, [])

    return (
        <>
            Worker
        </>
    )
}

export default WorkerUsage
