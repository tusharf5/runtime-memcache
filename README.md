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

| Property      | Description                                                                          | Type             | Default   |
| ------------- | ------------------------------------------------------------------------------------ | ---------------- | --------- |
| `timeToClear` | Time in **milliseconds** for which the store will persist a key-value pair as cache. | Number           | 7200000   |
| `strategy`    | A Strategy to keep and delete items from the store                                   | `timeout`, `lru` | `timeout` |
| `lruSize`     | Size of the cache store when the strategy is `lru`                                   | Number           | 500       |

<br />

### Caching Strategies

| Strategy  | Description                                                                                                                        |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `timeout` | The items in the cache store will be automatically deleted after when a specified amount of time has elapsed since an item was set |
| `lru`     | This scheme removes the least recently used item when the store size is full                                                       |

<br />

### Example

```javascript
const config = {
  strategy: 'timeout',
  timeToClear: 7200000, // 2 hours
};

const store = (createStore< 'key1') | ('key2', { name: string } > config);

store.set('key1', {}); // store the object and associate it with the provided key

store.get('key1'); // retrieves the object associated with this key

store.remove('key1'); // deletes the object associated with this key
```

## NPM Script Commands

- `npm run test` -- Runs tests, lint and build.
- `npm run lint` -- Runs ESLint.
- `npm run format` -- Reformats all of the `.ts` and `.tsx` files with Prettier.
- `npm run build` -- Regenerates `lib` folder that gets included into NPM module.

## License

MIT

## Todos

- <s>Timeout Strategy</s>
- <s>Least Recently Used Strategy<s>
