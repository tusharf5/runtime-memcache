import { CreateStoreResult, GlobalConfig } from './types';

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
