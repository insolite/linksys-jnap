# linksys-jnap

A JS library for communicating with Linksys routers using JNAP protocol.

## Install

The package isn't yet published. It can be installed via github link though:

```bash
npm i git@github.com:insolite/linksys-jnap.git
```

## Usage

```js
import { LinksysDevice } from 'linksys-jnap';

const linksysRouter = new LinksysDevice({
  origin: '192.168.1.1',
  password: '123456789',
});

console.log(device.getDevices());
```

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md)
