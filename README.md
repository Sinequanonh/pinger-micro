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

`now -e LOCATION=sanfrancisco`

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
