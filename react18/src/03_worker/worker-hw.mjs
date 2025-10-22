console.log('worker started')

const work = (duration) => {
    const start = Date.now()
    const end = start + duration
    let current = Date.now()
    while (current < end) {
        current = Date.now()
    }
}

/**
 * 
 * @param {Array<number>} bytes 
 */
const top10 = (bytes) => {
    // [index:77, value:10022]
    const pairs = bytes.map((value, index) => ({byte: index, count: value}))
    pairs.sort((a, b) => - (a.count - b.count))
    return pairs.slice(0, 10)
}

/**
 * 
 * @param {ArrayBuffer} data 
 */
const calculate = (data) => {
    const bytes = new Uint8Array(data)

    // {byte: count} -> {0: 0, 1: 0, 2: 0}
    // Map
    // array -> [0 ... 255]: 77 -> [77]
    //  index - byte value
    //  value - count

    const stats = {
        percent: 0,
        bytes: new Array(256).fill(0),
    }

    bytes.forEach((byte, idx) => {
        stats.bytes[byte]++
        if (idx % 1_000_000 === 0) {
            globalThis.postMessage({
                type: 'progress',
                data: {
                    percent: Math.round(idx / bytes.length * 100),
                    top10: top10(stats.bytes),
                }
            })
            work(500)
            // TODO: setTimeout()
        }
    })

    // let prevSend = Date.now()
    // bytes.forEach((byte, idx) => {
    //     stats.bytes[byte]++
    //     if (Date.now() - prevSend >= 50) {
    //         globalThis.postMessage({
    //             type: 'progress',
    //             data: {
    //                 percent: Math.round(idx / bytes.length * 100),
    //                 top10: top10(stats.bytes),
    //             }
    //         })
    //         prevSend = Date.now()
    //     }
    // })

    globalThis.postMessage({
        type: 'complete',
        data: {
            percent: 100,
            top10: top10(stats.bytes),
        }
    })
}

// self
globalThis.addEventListener('message', (ev) => {
    const {type, data} = ev.data
    switch (type) {
        case 'calculate':
            calculate(data)
            break
        default:
            // TODO:
    }
})
