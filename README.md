# runtime-memcache

![LISCENCE](https://img.shields.io/npm/l/runtime-memcache) ![NPM Downloads](https://img.shields.io/npm/dt/runtime-memcache) ![NPM Version](https://img.shields.io/npm/v/runtime-memcache) ![Size](https://img.shields.io/bundlephobia/minzip/runtime-memcache)

runtime-memcache is a **no dependency**, high performance, near optimal javascript caching library to store key-value cache store for small chunks of arbitrary data (strings, objects, numbers) from results of database calls, API calls, or etc. It is written in Typescript and supports many commonly used caching policies.

When creating a new cache store, you can specify the policy to evict items from the store. The default policy is `lru` (Least Recently Used)

runtime-memcache provides flexible construction to create a cache with a combination of the following features:

- size-based eviction when a maximum is exceeded based on frequency and recency
- time-based expiration of entries, measured since last access or last write

## Installation

```shell
npm install --save runtime-memcache
# or using yarn
yarn add runtime-memcache
```

## Usage

### Node Environment (ES6+ import/export)

```javascript
import createStore from 'runtime-memcache';
```

### Node Environment (CJS)

```javascript
const createStore = require('runtime-memcache');
```

### Browser (use as a script tag)

```html
<script src="https://unpkg.com/runtime-memcache@2.0.0/dist/umd/index.js"></script>
<!-- OR JUST -->
<script src="https://unpkg.com/runtime-memcache@2.0.0"></script>
<script>
  // RMStore is globaly set
  const store = new RMStore();
</script>
```

## API

Calling the `createStore` function returns an object with the following properties.

| Property        | Description                                      |
| --------------- | ------------------------------------------------ |
| `get(id)`       | Retrieves an item from the store                 |
| `has(id)`       | Check if an item exists in the store             |
| `set(id, data)` | Sets an item in the store                        |
| `remove(id)`    | Removes an item from the store                   |
| `size()`        | Returns the size of the item cache store         |
| `keys()`        | Returns all the keys of the cache store as array |

## Config

`createStore` takes an optional config object as an argument with the following properties.

| Property      | Description                                                                                           | Type                            | Default |
| ------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------- | ------- |
| `timeToClear` | Time in **milliseconds** for which the store will keep an item when the policy is `timeout` or `tlru` | Number                          | 7200000 |
| `policy`      | A Policy to evict items from the store                                                                | `timeout`, `lru`, `mru`, `tlru` | `lru`   |
| `lruSize`     | Size of the cache store when the policy is `lru` or `tlru`                                            | Number                          | 500     |
| `mruSize`     | Size of the cache store when the policy is `mru`                                                      | Number                          | 500     |

## Caching Policies

Following caching policies are supported.

| Policy    | Name                           | Description                                                                                                                                                                      |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `timeout` | Timeout                        | The items in the cache store will be automatically evicted after a fixed amount of time has elapsed since that item was set                                                      |
| `lru`     | Least Recently Used            | This policy evicts the **least recently used** items when the store size is full                                                                                                 |
| `tlru`    | Time Aware Least Recently Used | This policy evicts the **least recently used** items when the store size is full and also evict untouched items after a fixed amount of time has elapsed since that item was set |
| `mru`     | Most Recently Used             | This policy evicts the **most recently used** items when the store size is full                                                                                                  |

## Time Complexity

| Policy  | Method                 | Complexity       |
| ------- | ---------------------- | ---------------- |
| timeout | `set`, `get`, `remove` | O(1), O(1), O(1) |
| lru     | `set`, `get`, `remove` | O(1), O(1), O(1) |
| tlru    | `set`, `get`, `remove` | O(1), O(1), O(1) |
| mru     | `set`, `get`, `remove` | O(1), O(1), O(1) |

## Example

```typescript
import createStore from 'runtime-memcache';

const config = {
  policy: 'timeout',
  timeToClear: 7200000, // 2 hours
};

interface CachedValue {
  name: string;
}

type Keys = 'key1' | 'key2';

const store = createStore<Keys, CachedValue>(config);

store.set('key1', {}); // store the object and associate it with the provided key

store.get('key1'); // retrieves the object associated with this key

store.has('key1'); // returns true

store.size(); // returns 1

store.keys(); // returns ['key1']

store.remove('key1'); // deletes the object associated with this key
```

</br>

```typescript
import createStore from 'runtime-memcache';

const config = {
  policy: 'lru',
  lruSize: 300, // cache a maximum of 300 users at a given time
};

const userCache = createStore(config);

async function loginUser(userId: string) {
  if (userCache.has(id)) {
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
- `npm run build` -- Regenerates `dist` folder that gets included into NPM module.

## Todos

- <s>Timeout Policy (TR)</s>
- <s>Least Recently Used Policy (LRU)</s>
- <s>Most Recently Used Policy (MRU)</s>
- Least Frequently Used Policy (LFU)
- <s>Time Aware Least Recently Used Policy (TLRU)</s>
- Random Eviction Policy (RR)

For more information on caching policies read [this](https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU)
