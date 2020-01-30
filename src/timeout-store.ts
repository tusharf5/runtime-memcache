import { CreateTimeoutResult, Cache, GlobalConfig } from './types';

function createTimeout<K>(timeToClear: number): CreateTimeoutResult<K> {
  const timeouts = new Map<K, NodeJS.Timer>();
  return {
    create: function(key: K, removeFromStore: (key: K) => boolean) {
      const timer = setTimeout(() => {
        removeFromStore(key); // dont need to delete key from timer here as removing it from store will do that
      }, timeToClear);
      timeouts.set(key, timer);
    },
    cancel: function(key: K) {
      if (timeouts.has(key)) {
        const timer = timeouts.get(key);
        timeouts.delete(key);
        clearTimeout(timer);
      }
    },
  };
}

function createStore<K>(config: GlobalConfig): Cache<K> {
  const store = new Map<K, any>();
  const timer = createTimeout<K>(config.timeToClear);
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
    const val = store.get(key);
    if (val) {
      return true;
    }
    return false;
  }

  function set(key: K, value: any) {
    store.set(key, value);
    timer.create(key, remove);
    return true;
  }

  return {
    size,
    has,
    get,
    set,
    remove,
  };
}

export default createStore;
