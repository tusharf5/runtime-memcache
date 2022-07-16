import { Cache, GlobalConfig } from './types';

import { createTimeAwareMapObserver } from './utils/TimeAwareMap';

function createStore<V>(config: GlobalConfig): Cache<V> {
  const store = new Map<string, any>();
  const timer = createTimeAwareMapObserver(config.timeToClear);
  function get(key: string): V {
    const val = store.get(key);
    if (val) {
      return val;
    }
    return null;
  }

  function remove(key: string) {
    store.delete(key);
    timer.cancel(key);
    return true;
  }

  function size(): number {
    return store.size;
  }

  function has(key: string): boolean {
    return store.has(key);
  }

  function keys(): string[] {
    return Array.from(store.keys());
  }

  function set(key: string, value: V) {
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
