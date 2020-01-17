# runtime-memcache

**runtime-memcache** is a javascript runtime in-memory key-value store for small chunks of arbitrary data (strings, objects, numbers) from results of database calls, API calls, or etc.

When creating a new store, you can specify the strategy to delete items from the store. The default strategy is. `timeout` which keeps a cache key-pair in store for 2 hours by default (which is configurable)

## Installation

```shell
npm install --save runtime-memcache
# or using yarn
yarn add runtime-memcache
```

## Usage

```javascript
const createStore = require('runtime-memcache').default;

// or using es6 imports
import createStore from 'runtime-memcache';
```

## API

### Config

| Property        | Description                                                             |
| --------------- | ----------------------------------------------------------------------- |
| `timeToClear`   | Time in milliseconds for which the store will persist a key-value pair as cache.  |
| `strategy`      | Accepted Values - `timeout`                                             |

### Caching Strategies

| Strategy        | Description                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------- |
| `timeout`       | The objects in the cache store will be automatically deleted after the time specified in config |

```javascript
const config = {
  strategy: 'timeout',
  timeToClear: 7200000, // 2 hours
};

const store = createStore<'key1' | 'key2'>(config);

store.set('key1', {}); // store the object and associate it with the provided key

store.get('key1'); // retrieves the object associated with this key

store.remove('key1'); // deletes the object associated with this key
```

## NPM Script Commands

* `npm run test` -- Runs tests, lint and build.
* `npm run lint` -- Runs ESLint.
* `npm run format` -- Reformats all of the `.ts` and `.tsx` files with Prettier.
* `npm run build` -- Regenerates `lib` folder that gets included into NPM module.

## License

MIT
