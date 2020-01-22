export interface UserConfig {
  strategy?: 'timeout' | 'lru';
  timeToClear?: number;
  lruSize?: number;
}

export interface CreateTimeoutResult<K> {
  create(key: K, removeFromStore: (key: K) => boolean): void;
  cancel(key: K): void;
}

export interface CreateStoreResult<K> {
  get(key: K): any;
  set(key: K, value: any): void;
  remove(key: K): void;
}

export interface GlobalConfig extends UserConfig {}
