const { send } = require('micro')
const url = require('url')

const ping = require('./https-measurer.js')

const green = '\033[32m'
const cyan = '\033[36m'
const blue = '\033[34m'
const yellow = '\033[33m'
const white = '\033[0m'

module.exports = async (req, res) => {
  if ('/favicon.ico' === req.url) {
    return
  }

  const location = process.env.LOCATION
  if (!location || !location.length) {
    return send(res, 400, { message: 'Requires the LOCATION environment variable', status: 400 })
  }

  let headers = { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36' }
  let body = ''

  const requestTime = new Date()
  const domain = url.parse(req.url, true).query.url

  if (!domain) {
    return send(res, 400, { message: 'Requires an url to ping', status: 400 })
  }

  const method = url.parse(req.url, true).query.method || 'HEAD'
  const rawBody = url.parse(req.url, true).query.body || ''
  const assertion = url.parse(req.url, true).query.assertion || null

  const rawHeaders = url.parse(req.url, true).query.headers || null

  if (!!rawHeaders) {
    const decodedHeaders = decodeURIComponent(rawHeaders)
    Object.assign(headers, JSON.parse(decodedHeaders))
  }

  if (!!rawBody) {
    const decodedBody = decodeURIComponent(rawBody)
    body = decodedBody
  }

  const data = { location, timeout: 0, url: domain, date: requestTime }

  try {
    const response = await ping({
      url: domain,
      method,
      headers,
      body,
      assertion
    });

    console.log(`Request for ${cyan + domain + white} with ${yellow + method + white} method`, new Date());
    Object.assign(data, response);
  } catch (e) {
    data.status = 500;
    data.timeout = 1;
    data.elapsedTime = 10000;
  }
  
  send(res, 200, data);
}
