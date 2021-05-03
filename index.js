const { run, send }           = require('micro');
const url                     = require('url');
const https                   = require('https');
const httpPing                = require('./https-measurer.js');
const { icmpPing, tcpPing }   = require('./ping.js');
const getHealth               = require('./health.js');
const getCertOptions          = require('./certOptions.js');
const handleError             = require('./handleError.js');
const [cyan, yellow, white]   = ['\033[36m', '\033[33m', '\033[0m'];
const PORT                    = process.env.PORT || 3443;

const TIMEOUT_SECONDS = 10;

const parseUrl = () => {
  let reqUrl = null;

  return {
    set(req) {
      reqUrl = req.url;
    },

    get(key, defaultValue) {
      return url.parse(reqUrl, true).query[key] || defaultValue;
    }
  }
}
  
const server = async (req, res) => {
  if ('/favicon.ico' === req.url) {return;}
  const location = process.env.LOCATION;
  if (!location || !location.length) {
    return send(res, 400, { message: 'Requires the LOCATION environment variable', status: 400 });
  }

  if ('/health' === req.url) {
    const health = getHealth();
    return send(res, 200, health);
  }
  const p = parseUrl();
  p.set(req);
  const domain = p.get('url');
  if (!domain) {return send(res, 400, { message: 'Requires an url to ping', status: 400 });}
  const method         = p.get('method', 'HEAD');
  const rawBody        = p.get('body', '');
  const assertion      = p.get('assertion');
  const followRedirect = p.get('followRedirect') !== 'false';
  const rawHeaders     = p.get('headers');
  const isTest         = p.get('isTest', false);
  const protocol       = p.get('protocol', 'http');
  const port           = Number(p.get('port', -1));
  const timeout        = Number(p.get('timeout', TIMEOUT_SECONDS));
  if (protocol === 'port') {
    const tcpResult = await tcpPing({ host: domain, port });
    tcpResult.location = location;
    tcpResult.url = domain;
    tcpResult.status = tcpResult.alive ? 200 : 400;
    tcpResult.protocol = protocol;
    tcpResult.port = port;
    tcpResult.date = new Date();
    return send(res, 200, tcpResult);
  }
  if (protocol === 'icmp') {
    const icmpResult = await icmpPing({ host: domain });
    icmpResult.location = location;
    icmpResult.url = domain;
    icmpResult.protocol = protocol;
    icmpResult.status = icmpResult.alive ? 200 : 400;
    icmpResult.date = new Date();
    return send(res, 200, icmpResult);
  }

  // HTTP protocol
  let headers = { 'User-Agent': 'Mozilla/5.0 (compatible; Hyperping/1.0; http://hyperping.io)' };
  if (!!rawHeaders) {
    const decodedHeaders = decodeURIComponent(rawHeaders);
    Object.assign(headers, JSON.parse(decodedHeaders));
  }
  const body = !!rawBody ? decodeURIComponent(rawBody) : '';
  const data = { location, timeout: 0, url: domain, date: new Date(), protocol };
  const start = process.hrtime();
  try {
    const response = await httpPing({
      url: domain,
      method,
      headers,
      body,
      assertion,
      followRedirect,
      isTest,
      timeout
    });
    console.log(`Request for ${cyan + domain + white} with ${yellow + method + white} method`, new Date());
    Object.assign(data, response);
  } catch (err) {
    data.elapsedTime = Math.round((process.hrtime(start)[0]*1000) + (process.hrtime(start)[1] / 1000000));
    Object.assign(data, handleError(err));
    if (data.status === 500 && data.elapsedTime >= (TIMEOUT_SECONDS * 1000)) {
      data.status = 408;
    }
    data.error = { message: err, debugUrl: req.url };
  }
  return send(res, 200, data);
};

module.exports = server;


if (process.env.NODE_ENV === 'prod') {
  const microHttps = fn => https.createServer(getCertOptions(), (req, res) => run(req, res, fn));
  const prodServer = microHttps(server);
  prodServer.listen(PORT);
}
