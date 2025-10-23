import { useSyncExternalStore } from "react"

const STORE_KEY = 'state'

const store = {
    listeners: new Set(), // () => {...}
    state: JSON.parse(localStorage.getItem(STORE_KEY)) 
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
    localStorage.setItem(STORE_KEY, JSON.stringify(store.state))
    // in single tab
    // store.listeners.forEach(listener => listener())
    const storageEvent = new StorageEvent('storage', {
        bubbles: false,
        cancelable: false,
        key: STORE_KEY,
        // TODO: 
        // oldValue
        // newValue
        storageArea: globalThis.localStorage
    })
    globalThis.dispatchEvent(storageEvent)
}

// in other tab
globalThis.addEventListener('storage', (ev) => {
    if (ev.key !== STORE_KEY) {
        return
    }
    store.state = JSON.parse(localStorage.getItem(STORE_KEY))
    store.listeners.forEach(listener => listener())
})

const LocalStorageExternalStoreContainer = () => {
    const handleClick = () => {
        updateStore()
    }

    return (
        <>
            {/* in most situatuation: logic error, in 0.01% - advanced usage */}
            <LocalStorageExternalStore /> 
            <button onClick={handleClick}>Update Store</button>
        </>
    )
}

const LocalStorageExternalStore = () => {
    // alternative: useEffect -> window 'storageEvent' -> setState
    const snapshot = useSyncExternalStore(subscribe, getSnapshot)

    return (
        <>{snapshot.now}</>
    )
}


export default LocalStorageExternalStoreContainer
