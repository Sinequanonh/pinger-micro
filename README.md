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
  "date": "2017-10-27T23:47:04.499Z",
  "url": "https://github.com",
  "elapsedTime": 221,
  "status": 200,
  "location": "sanfrancisco",
  "timeout": 0
}
```
