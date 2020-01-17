export interface UserConfig {
  strategy?: 'timeout';
  timeToClear?: number;
}

export interface CreateTimeoutResult<K> {
  create(key: K, removeFromStore: (key: K) => boolean): void;
  cancel(key: K): void;
}

export interface CreateHashStoreResult<K> {
  get(key: K): any;
  set(key: K, value: any): void;
  remove(key: K): void;
}

export interface GlobalConfig extends UserConfig {}

export const defaultConfig: GlobalConfig = {
  strategy: 'timeout',
  timeToClear: 7200000, // 2 hours
};

function createTimeout<K>(timeToClear: number): CreateTimeoutResult<K> {
  const timeouts = new Map<K, NodeJS.Timer>();
  return {
    create: function(key: K, removeFromStore: (key: K) => boolean) {
      const timer = setTimeout(() => {
        removeFromStore(key); // dont need to delete key from timer as removing it from store will do that
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

function createHashStore<K>(userConfig: UserConfig): CreateHashStoreResult<K> {
  const config: GlobalConfig = Object.assign({}, defaultConfig, userConfig);
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

  function set(key: K, value: any) {
    store.set(key, value);
    timer.create(key, remove);
    return true;
  }

  return {
    get,
    set,
    remove,
  };
}

export default createHashStore;
