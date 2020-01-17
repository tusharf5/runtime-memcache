# in-memcache

in-memcache is an in-memory key-value store for small chunks of arbitrary data (strings, objects) from results of database calls, API calls, or page rendering.


## Config

| Property        | Description                                                             |
| --------------- | ----------------------------------------------------------------------- |
| `timeToClear`   | Time in milliseconds for which the store will persist a key-value pair  |
| `strategy`      | Accepted Values - `timeout`                                             |


## Caching Strategies

| Strategy        | Description                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------- |
| `timeout`       | The objects in the cache store will be automatically deleted after the time specified in config |


## Usage

```shell
npm install --save in-memcache
# or using yarn
yarn add in-memcache
```

Then require it in your module.

```javascript
const createStore = require('in-memcache').default;
```

## OR using ES6 imports

```javascript
import createStore from 'in-memcache';
```

## API

### Arguments as strings

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
