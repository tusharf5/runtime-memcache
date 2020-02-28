import { Cache, GlobalConfig } from './types';

import { createTimeAwareMapObserver } from './utils/TimeAwareMap';

function createStore<K>(config: GlobalConfig): Cache<K> {
  const store = new Map<K, any>();
  const timer = createTimeAwareMapObserver<K>(config.timeToClear);
  function get(key: K) {
    const val = store.get(key);
    if (val) {
      return val;
    }
    return null;
  }

  function remove(key: K) {
    store.delete(key);
    timer.cancel(key);
    return true;
  }

  function size() {
    return store.size;
  }

  function has(key: K): boolean {
    return store.has(key);
  }

  function keys(): K[] {
    return Array.from(store.keys());
  }

  function set(key: K, value: any) {
    store.set(key, value);
    timer.create(key, remove);
    return true;
  }

  return {
    keys,
    size,
    has,
    get,
    set,
    remove,
  };
}

export default createStore;
