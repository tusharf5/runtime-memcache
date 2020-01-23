# runtime-memcache

runtime-memcache is a javascript runtime key-value cache store for small chunks of arbitrary data (strings, objects, numbers) from results of database calls, API calls, or etc.

When creating a new cache store, you can specify the strategy to evict items from the store. The default strategy is. `timeout` which keeps a cache key-pair in store for 2 hours by default (which is configurable)

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

| Property      | Description                                                                                   | Type             | Default   |
| ------------- | --------------------------------------------------------------------------------------------- | ---------------- | --------- |
| `timeToClear` | Time in **milliseconds** for which the store will keep an item when the strategy is `timeout` | Number           | 7200000   |
| `strategy`    | A Strategy to evict items from the store                                                      | `timeout`, `lru` | `timeout` |
| `lruSize`     | Size of the cache store when the strategy is `lru`                                            | Number           | 500       |

<br />

### Caching Strategies

| Strategy  | Description                                                                                                                 |
| --------- | --------------------------------------------------------------------------------------------------------------------------- |
| `timeout` | The items in the cache store will be automatically evicted after a fixed amount of time has elapsed since that item was set |
| `lru`     | This scheme evicts the least recently used item when the store size is full                                                 |

<br />

### Example

```typescript
import createStore from 'runtime-memcache';

const config = {
  strategy: 'timeout',
  timeToClear: 7200000, // 2 hours
};

const store = createStore<'key1' | 'key2', { name: string }>(config);

store.set('key1', {}); // store the object and associate it with the provided key

store.get('key1'); // retrieves the object associated with this key

store.remove('key1'); // deletes the object associated with this key
```

</br>

```typescript
import createStore from 'runtime-memcache';

const config = {
  strategy: 'lru',
  lruSize: 300, // cache a maximum of 300 users at a given time
};

const userCache = createStore(config);

function loginUser(userId: string) {
  if (userCache.get(id)) {
    return userCache.get(id);
  }

  const user = await UserService.getUser(id);

  userCache.set(id, user);

  return user;
}
```

## NPM Script Commands

- `npm run test` -- Runs tests, lint and build.
- `npm run lint` -- Runs ESLint.
- `npm run format` -- Reformats all of the `.ts` and `.tsx` files with Prettier.
- `npm run build` -- Regenerates `lib` folder that gets included into NPM module.

## License

MIT

## Todos

- <s>Timeout Strategy (TR)</s>
- <s>Least Recently Used Strategy (LRU)</s>
- Least Frequently Used Strategy (LRU)
- Most Recently Used Strategy (MRU)
- Time Aware Least Recently Used Strategy (TLRU)
- Random Eviction Strategy (RR)

For more information on caching strategies read [this](https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU)
