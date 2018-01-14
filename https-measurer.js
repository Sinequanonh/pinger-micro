const request = require('request')

const MS_PER_NANO = 1000000
const NANO_PER_SEC = 1e9
const TIMEOUT = 10000

module.exports = (url, method) => new Promise((resolve, reject) => {
  const payload = {}

  const req = request({
    uri: url,
    method,
    timeout: TIMEOUT,
    time: true,
  }, (err, resp) => {
    if (resp && resp.timings) {
      const tcpConnectionAt = resp.timings.connect

      payload.status = Math.round(resp.statusCode)
      payload.dns = Math.round(resp.timings.lookup)
      payload.tcp = Math.round(resp.timingPhases.tcp)
      payload.firstByte = Math.round(resp.timingPhases.firstByte)
      payload.download = Math.round(resp.timingPhases.download)
      payload.wait = Math.round(resp.timingPhases.wait)
      payload.elapsedTime = Math.round(resp.timings.end) - Math.round(resp.timingPhases.download)
      payload.total = Math.round(resp.timings.end)

      resolve(payload)
    }

    if (err) {
      console.log(err)
      reject()
    }
  })

  req.on('socket', (socket) => {
    socket.on('connect', () => {
      payload.tcpConnectionAt = process.hrtime()
    })

    socket.on('secureConnect', () => {
      payload.tlsHandshakeAt = process.hrtime(payload.tcpConnectionAt)
      payload.tlsHandshake = payload.tlsHandshakeAt !== undefined ? ((payload.tlsHandshakeAt[0] * NANO_PER_SEC + payload.tlsHandshakeAt[1]) / MS_PER_NANO)  : undefined
      delete payload.tlsHandshakeAt
      delete payload.tcpConnectionAt
    })
  })

})
