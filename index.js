const fetch = require('node-fetch')
const { send } = require('micro')
const url = require('url')

module.exports = async (req, res) => {
  if ('/favicon.ico' === req.url) {
    return
  }

  const location = process.env.LOCATION
  if (location === undefined) {
    return send(res, 400, { message: 'Requires the LOCATION environment variable', status: 400 })
  }

  const requestTime = new Date()
  const domain = url.parse(req.url, true).query.url

  const response = await fetch(domain).catch(() => {
    send(res, 400, { message: 'This domain does not exist', url: domain, status: 400 })
  })

  if (response === undefined) {
    return
  }

  const data = await {
    date: requestTime,
    url: response.url,
    elapsedTime: (new Date() - requestTime),
    status: response.status,
    location,
  }

  return send(res, 200, data)
}
