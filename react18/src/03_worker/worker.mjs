console.log('worker started')

// self
globalThis.addEventListener('message', (ev) => {
    console.log('worker received message', ev)
})
