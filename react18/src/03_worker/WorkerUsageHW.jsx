import { useState } from "react"
import { useEffect } from "react"
import { useRef } from "react"

const WorkerUsage = () => {
    const [workerResult, setWorkerResult] = useState()
    // TODO:
    // 1. useEffect: create + remove
    // 2. useRef + useEffect (for handler)
    const workerRef = useRef(null)

    useEffect(() => {
        workerRef.current = new Worker(new URL('./worker.mjs', import.meta.url), {
            type: 'module'
        })

        workerRef.current.addEventListener('message', (ev) => {
            const {type, result} = ev.data;
            setWorkerResult(result)
        })

        return () => workerRef.current?.terminate()
    }, [])

    // const handleRun = (ev) => {
    //     // TODO:
    //     //  1. Structured Clone
    //     workerRef.current?.postMessage({
    //         type: 'calculate',
    //         duration: 20_000
    //     })
    //     // 2. Transferable (HW) -> ArrayBuffer
    //     // workerRef.current?.postMessage(buffer, [buffer]);
    // }

    const handleChange = async (ev) => {
        // File -> arrayBuffer()
        const buffer = await ev.currentTarget.files[0].arrayBuffer()
        console.log(buffer)
        
        // TODO: send to worker

        // in worker
        const bytes = new Uint8Array(buffer)
        for (const byte of bytes) {
            console.log(byte)
            break
        }
    }

    return (
        <>
            <p>Worker result {workerResult}</p>
            <input onChange={handleChange} type="file" name="" id="" />
        </>
    )
}

export default WorkerUsage
