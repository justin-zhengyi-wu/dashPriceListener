# dashPriceListener

Moniter the price of software [dash](http://kapeli.com/dash).

If the price drops below the line of threshold that configured, send out a mail to be notified.

## Usage:
- Add a file named `auth.json` that contains:
```json
{
    "service": "xxx",
    "user": "xxx@xxx",
    "pwd": "xxx"
}
```
- run
```sh
npm install
node index.js
```
