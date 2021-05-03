const errors = [
  {
    message: 'certificate has expired',
    status: 495,
    description: 'ERR_CERT_DATE_INVALID'
  },
  {
    message: 'unable to verify the first certificate',
    status: 495,
    description: 'ERR_CERT_UNABLE_TO_VERIFY'
  },
  {
    message: 'ESOCKETTIMEDOUT',
    status: 408,
    description: 'ESOCKETTIMEDOUT',
  },
  {
    message: 'ETIMEDOUT',
    status: 408,
    description: 'ETIMEDOUT',
  },
  {
    message: 'getaddrinfo ENOTFOUND',
    status: 503,
    description: 'getaddrinfo ENOTFOUND',
  },
  {
    message: 'connect ECONNREFUSED',
    status: 500,
    description: 'connect ECONNREFUSED',
  },
];

// Request path contains unescaped characters /?url=https%3A%2F%2Fshanling.nctu.me%2F%E5%B1%B1%E5%B6%BA%E7%A6%8F%E5%BE%B7%E5%BB%9F&method=HEAD&headers=%7B%7D&followRedirect=true
// EHOSTUNREACH /?url=https%3A%2F%2Fpetmaxipedro.online%2Fweb&method=GET&headers=%7B%7D&followRedirect=true
// ENETUNREACH ?url=https%3A%2F%2Fipv6.google.com&method=GET&headers=%7B%7D&followRedirect=true
// ECONNRESET /?url=https%3A%2F%2Fmerchant.stcpay.com.sa&method=HEAD&headers=%7B%7D&followRedirect=true

const handleError = ({ message, code }) => {
  const error = errors.find(err =>
    message.includes(err.message) || code.includes(err.message)
    || message.includes(err.description) || code.includes(err.description)
  );
  if (!!error) {
    delete error.message;
    return error;
  } else {
    console.log('✗ Unknown error', message);
    return {
      status: 500
    }
  }
}

module.exports = handleError;
