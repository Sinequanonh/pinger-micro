const request = require('request')

const MS_PER_NANO = 1000000
const NANO_PER_SEC = 1e9

const ping = () => new Promise(async (resolve, reject) => {
  const payload = {}

  const req = request({
    uri: 'https://zeit.co',
    // uri: 'https://spectrum.chat',
    method: 'GET',
    time: true,
  }, async (err, resp) => {
    if (resp.timings) {
      // console.log(resp.timingPhases)
      console.log('')
      // console.log(resp.timings)

      const tcpConnectionAt = resp.timings.connect

      console.log('')
      payload.dns = resp.timings.lookup // DNS resolved!
      payload.tcp = resp.timingPhases.tcp // TCP connection!
      payload.firstByte = resp.timingPhases.firstByte
      payload.download = resp.timingPhases.download
      payload.wait = resp.timingPhases.wait
      payload.total = resp.timings.end
      console.log('')
      resolve(payload)
    }
  })

  req.on('socket', (socket) => {

    socket.on('connect', () => {
      payload.tcpConnectionAt = process.hrtime()
    })

    socket.on('secureConnect', () => {
      // payload.tlsHandshakeAt = process.hrtime()
      payload.tlsHandshakeAt = process.hrtime(payload.tcpConnectionAt)

    })
  })

})

ping().then((res) => {
  const payload = res
  payload.tlsHandshake = payload.tlsHandshakeAt !== undefined ? ((payload.tlsHandshakeAt[0] * NANO_PER_SEC + payload.tlsHandshakeAt[1]) / MS_PER_NANO)  : undefined
  delete payload.tlsHandshakeAt
  delete payload.tcpConnectionAt
  console.log(payload)
})

// const payload = await ping()
