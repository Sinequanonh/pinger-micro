const request = require('request')

const MS_PER_NANO = 1000000
const NANO_PER_SEC = 1e9
const TIMEOUT = 10000

const isStatusOk = status => (status >= 200 && status < 300);

const ping = (data) => new Promise((resolve, reject) => {
  const { url, method, headers, body, assertion } = data
  const payload = {}
  
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

      payload.status = Math.round(resp.statusCode)
      payload.dns = Math.round(resp.timings.lookup)
      payload.tcp = Math.round(resp.timingPhases.tcp)
      payload.firstByte = Math.round(resp.timingPhases.firstByte)
      payload.download = Math.round(resp.timingPhases.download)
      payload.wait = Math.round(resp.timingPhases.wait)
      payload.elapsedTime = Math.round(resp.timings.end) - Math.round(resp.timingPhases.download)
      payload.total = Math.round(resp.timings.end)

      if (!isStatusOk(payload.status)) {
        if (!!resp.body && !!resp.body.length) {
          payload.body = resp.body;
        }

        if (!!resp.statusMessage && !!resp.statusMessage.length) {
          payload.body = resp.statusMessage;
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

exports.handler = (event, context, callback) => {
  const location = process.env.LOCATION
  if (location === undefined) {
    return callback(null, { message: 'Requires the LOCATION environment variable', status: 400 })
  }

  let headers = { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36' }
  let body = ''

  const requestTime = new Date()
  const domain = event.query ? event.query.url : 'https://zeit.co'
  const method = (event.query && event.query.method) ? event.query.method : 'HEAD'
  const assertion = (event.query && event.query.assertion) ? event.query.assertion : null
  const rawHeaders = (event.query && event.query.headers) ? event.query.headers : undefined
  const rawBody = (event.query && event.query.body) ? event.query.body : ''

  if (!!rawHeaders) {
    const decodedHeaders = decodeURIComponent(rawHeaders)
    Object.assign(headers, JSON.parse(decodedHeaders))
  }

  if (!!rawBody && !!rawBody.length) {
    const decodedBody = decodeURIComponent(rawBody)
    body = decodedBody
  }

  const data = { location, timeout: 0, url: domain, date: requestTime }

  ping({
    url: domain,
    method,
    headers,
    body,
    assertion
  }).then((response) => {
    Object.assign(data, response)
    callback(null, data)
  }).catch((e) => {
    data.status = 500
    data.timeout = 1
    data.elapsedTime = 10000
    callback(null, data)
  })
}
