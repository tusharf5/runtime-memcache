import { CreateStoreResult, GlobalConfig } from './types';

const cache = {
  sadsadsasdad: {},
  a12j3n123jn12k3j: {},
  asdasdsadasdad: {},
  a999999444: {},
};

// - Strategy Least Recently Used
// - Strategy Least Used
// - Strategy Least Recent

const hits = {
  sadsadsasdad: 93,
  a12j3n123jn12k3j: 1,
  asdasdsadasdad: 8,
  a999999444: 9,
};

const sortedArray = ['sadsadsasdad', '12j3n123jn12k3j', 'asdasdsadasdad', '999999444'];

function createStore<K>(config: GlobalConfig): CreateStoreResult<K> {
  const store = new Map<K, any>();

  function get(key: K) {
    const val = store.get(key);
    if (val) {
      return val;
    }
    return null;
  }

  function remove(key: K) {
    store.delete(key);

    return true;
  }

  function set(key: K, value: any) {
    store.set(key, value);

    return true;
  }

  return {
    get,
    set,
    remove,
  };
}

export default createStore;
