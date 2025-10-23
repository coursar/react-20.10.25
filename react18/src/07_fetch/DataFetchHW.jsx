import { useState } from "react"
import { useEffect } from "react"
import { Suspense } from "react"

const DataFetchContainerHW = () => {
    const [load, setLoad] = useState(false)

    const handleLoad = () => {
        setLoad(true)
    }

    return (
        <>
            <button onClick={handleLoad}>Load</button>
            {load && <Suspense fallback={<div>Loading...</div>}>
                <DataFetch />
            </Suspense>}
        </>
    )
}

// TODO:
//  1. throw Promise -> data loading...
//  2. promise.then => rerender component -> run() -> return data (not throw)

const dataFetch = () => {
    // loading data
    let data = null
    let complete = false

    // HW -> заменить на fetch GET http://localhost:9999/api/suspend/data
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
            data = {
                username: 'Anonymous'
            }
            complete = true
        }, 5000)
    })

    return {
        run() {
            if (!complete) {
                throw promise
            }

            // if error => throw new Error

            return data
        }
    }
}

const dataFetcher = dataFetch()

const DataFetch = () => {
    // in data -> data (not promise, not state...)
    // loading, ...
    const data = dataFetcher.run()

    return (
        <>{data.username}</>
    )
}

export default DataFetchContainerHW