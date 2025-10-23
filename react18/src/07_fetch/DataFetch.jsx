import { useState } from "react"
import { useEffect } from "react"
import { Suspense } from "react"

const DataFetchContainer = () => {
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

const DataFetchAfterRender = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // logic
        // setLoading
        // setData()
    }, [])

    if (loading) {
        return <>Loading...</>
    }

    return (
        <>{data.username}</>
    )
}

// TODO:
//  1. throw Promise -> data loading...
//  2. promise.then => rerender component -> run() -> return data (not throw)

const dataFetch = () => {
    // loading data
    let data = null
    let complete = false

    // HW -> network GET /api/suspend/data -> fetch
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

export default DataFetchContainer