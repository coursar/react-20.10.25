import { lazy } from "react"
import { Suspense } from "react"
import { useState } from "react"

const RemoteLazy = lazy(() => import('./Remote'))

const RemoteContainer = () => {
    const [loadRemote, setLoadRemote] = useState(false)

    const handleLoadRemote = () => {
        setLoadRemote(true)
    }

    return (
        <>
            <button onClick={handleLoadRemote}>Load</button>
            {loadRemote && <Suspense fallback={<div>Loading...</div>}>
                <RemoteLazy />
            </Suspense>}
        </>
    )
}

export default RemoteContainer