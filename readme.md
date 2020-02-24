# botservice
This is the core package which [https://www.npmjs.com/package/@zoomus/chatbot-cli](https://www.npmjs.com/package/@zoomus/chatbot-cli) used. It will create the apis&&commands&actions&&middleware for you that defined in botConfig.js

## Installation

`npm i botservice -S`


## Usage

After follow code,we will bind botConfig.js config to implement related functions

```js
const botservice = require('botservice');
botservice(expressApp, botConfig);
```
