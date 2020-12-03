const fs = require('fs');

const getCertOptions = () => {
  let options = {};
  
  if (process.env.NODE_ENV === 'prod') {
    try {
      if (!!fs.readFileSync('/etc/letsencrypt/live/ams.hyperping.io/privkey.pem', 'utf8')) {
        const key = fs.readFileSync('/etc/letsencrypt/live/ams.hyperping.io/privkey.pem', 'utf8');
        const cert = fs.readFileSync('/etc/letsencrypt/live/ams.hyperping.io/fullchain.pem', 'utf8');
        const ca = fs.readFileSync('/etc/letsencrypt/live/ams.hyperping.io/fullchain.pem', 'utf8');
        options = { key, cert, ca };
        return options;
      }
    } catch (err) {
      return {};
    }
  }

}


module.exports = getCertOptions;
