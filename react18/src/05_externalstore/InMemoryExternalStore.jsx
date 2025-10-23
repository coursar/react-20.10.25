import { useState } from "react"
import { useSyncExternalStore } from "react"

const store = {
    listeners: new Set(), // () => {...}
    state: {
        now: Date.now(),
    },
}

const subscribe = (listener) => {
    store.listeners.add(listener)

    return () => {
        store.listeners.delete(listener)
    }
}

const getSnapshot = () => {
    return store.state 
}

const updateStore = () => {
    store.state = {...store.state, now: Date.now()}
    store.listeners.forEach(listener => listener())
}

setInterval(() => {
    updateStore()
}, 10_000)

const InMemoryExternalStoreContainer = () => {
    const [state, setState] = useState(0)

    const handleClick = () => {
        setState(prev => prev + 1)
    }

    return (
        <>
            {/* in most situatuation: logic error, in 0.01% - advanced usage */}
            <InMemoryExternalStore key={state} /> 
            <button onClick={handleClick}>Recreate</button>
        </>
    )
}

const InMemoryExternalStore = () => {
    const snapshot = useSyncExternalStore(subscribe, getSnapshot)

    return (
        <>{snapshot.now}</>
    )
}


export default InMemoryExternalStoreContainer
