const ping = require('ping');
const net  = require('net');

const icmpPing = async ({ host }) => {
  const res = await ping.promise.probe(host, { timeout: 10 });

  return {
    alive: res.alive,
    elapsedTime: Math.round(res.time)
  };
}

const getMs = (startHrTime) => {
  const elapsedHrTime = process.hrtime(startHrTime);
  const elapsedTimeInMs = Math.round(elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6);
  return elapsedTimeInMs;
}

const tcpPing = async ({ host, port = 0 }) => new Promise((resolve, reject) => {
  const sock = new net.Socket();
  let startHrTime;

  sock.setTimeout(10000);
  sock.on('connect', (res) => {
    sock.destroy();
    return resolve({ alive: true, elapsedTime: getMs(startHrTime) });
  });
  
  sock.on('error', (err) => {
    return resolve({ alive: false, message: err.message, elapsedTime: getMs(startHrTime) });
  });
  
  sock.on('timeout', () => {
    return resolve({ alive: false, message: 'timeout', elapsedTime: getMs(startHrTime) });
  });

  // let received = "";
  // sock.on('data', (data) => {
  //   received += data;
  //   sock.destroy();
  //   return resolve({ status: 'up', message: received, elapsedTime: getMs(startHrTime) });
  // });

  startHrTime = process.hrtime();
  sock.connect(port, host);
});

module.exports = { icmpPing, tcpPing }
