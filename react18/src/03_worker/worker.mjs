console.log('worker started')

const work = (duration) => {
    const start = Date.now()
    const end = start + duration
    let current = Date.now()
    while (current < end) {
        current = Date.now()
    }
}

// self
globalThis.addEventListener('message', (ev) => {
    console.log('worker received message', ev)
    work(ev.data.duration)
})
