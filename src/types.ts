export interface Config {
  policy?: 'timeout' | 'lru' | 'mru';
  strategy?: 'timeout' | 'lru' | 'mru';
  timeToClear?: number;
  lruSize?: number;
  mruSize?: number;
}

export interface CreateTimeoutResult<K> {
  create(key: K, removeFromStore: (key: K) => boolean): void;
  cancel(key: K): void;
}

export interface Cache<K> {
  keys(): K[];
  size(): number;
  has(key: K): any;
  get(key: K): any;
  set(key: K, value: any): void;
  remove(key: K): void;
}

export interface GlobalConfig extends Config {}
