export interface Config {
  policy?: 'timeout' | 'lru' | 'mru' | 'tlru';
  strategy?: 'timeout' | 'lru' | 'mru';
  timeToClear?: number;
  lruSize?: number;
  mruSize?: number;
}

export interface CreateTimeoutResult<K> {
  create(key: K, removeFromStore: (key: K) => any): void;
  cancel(key: K): void;
}

export interface Cache<K, V> {
  keys(): K[];
  size(): number;
  has(key: K): boolean;
  get(key: K): V | null;
  set(key: K, value: V): void;
  remove(key: K): void;
}

export interface GlobalConfig extends Config {}
