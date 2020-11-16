# pinger-micro
A single-function HTTP microservice that pings an url from a given server location

# 👌 Features

- **Tiny.** Just 35 lines of code.
- **Functional.** HTTP method using function.
- **Async.** Designed to use `async/await`.

# 💻 Usage

`npm i`

`LOCATION=frankfurt npm run dev`

# 👨‍💻 Deploy the API

`now -e LOCATION=sanfrancisco --force --regions sfo1`

The `timeout` is set at 10000 ms.

GET `https://now-deploy-{uid}.now.sh/?url=https://github.com`

Reponse:

```json
{
  "location": "paris",
  "timeout": 0,
  "url": "https://github.com",
  "date": "2017-12-19T19:31:48.927Z",
  "tlsHandshake": 202.716588,
  "status": 200,
  "dns": 29,
  "tcp": 97,
  "firstByte": 403,
  "download": 196,
  "wait": 23,
  "elapsedTime": 725
}
```
# New Digital Ocean instance:

sudo apt-get update;

sudo apt-get install curl software-properties-common git;
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -;
sudo apt-get install -y nodejs;
node -v;

sudo npm i pm2 micro -g;
git clone HTTPS of pinger;
npm i;

LOCATION=nyc pm2 start micro;

# New EC2 instance:

`sudo yum install emacs curl software-properties-common git`

`curl -sL https://rpm.nodesource.com/setup_10.x | sudo bash -`

`sudo yum install -y nodejs`

`sudo npm i pm2 micro -g;`

`git clone https://github.com/Sinequanonh/pinger-micro.git; cd pinger-micro;npm i`

`LOCATION={region} pm2 start micro;`

# Start the same instance with a different port
`LOCATION=nyc pm2 start -f micro --name="port:3002" -- -l tcp://0.0.0.0:3002`

# Renew cert
`sudo certbot certonly -d ams.hyperping.io`

# Start in cluster mode
`LOCATION=paris pm2 start micro -i 2`

# Kill program running on the same port
lsof -i tcp:3000
$ kill -9 PID
