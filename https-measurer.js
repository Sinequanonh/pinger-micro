const request = require('request')

const MS_PER_NANO = 1000000
const NANO_PER_SEC = 1e9
const TIMEOUT = 10000

const isStatusOk = status => (status >= 200 && status < 300);

module.exports = (data) => new Promise((resolve, reject) => {
  const payload = {};
  const { url, method, headers, body, assertion } = data;

  const params = {
    uri: url,
    method,
    timeout: TIMEOUT,
    time: true,
    headers
  };

  if (!!body && !!body.length) {
    params.body = body;
  }

  const req = request(params, (err, resp) => {
    if (resp && resp.timings) {
      const tcpConnectionAt = resp.timings.connect

      if (!!resp.body && !!assertion) {
        payload.assertion = resp.body.includes(assertion)
      }

      payload.status = parseInt(resp.statusCode, 10);
      payload.dns = Math.round(resp.timings.lookup)
      payload.tcp = Math.round(resp.timingPhases.tcp)
      payload.firstByte = Math.round(resp.timingPhases.firstByte)
      payload.download = Math.round(resp.timingPhases.download)
      payload.wait = Math.round(resp.timingPhases.wait)
      payload.elapsedTime = Math.round(resp.timings.end) - Math.round(resp.timingPhases.download)
      payload.total = Math.round(resp.timings.end)

      if (!isStatusOk(payload.status)) {
        if (!!resp.body && !!resp.body.length) {
          try {
            JSON.parse(resp.body);
            payload.body = JSON.stringify(JSON.parse(resp.body));
          } catch (e) {
            payload.body = resp.body;
          }
        }

        if (!!resp.statusMessage && !!resp.statusMessage.length) {
          payload.statusMessage = resp.statusMessage;
        }

        if (!!resp.headers) {
          payload.headers = resp.headers;
        }
      }

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
