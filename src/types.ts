export interface Config {
  policy?: 'timeout' | 'lru' | 'mru' | 'tlru';
  strategy?: 'timeout' | 'lru' | 'mru';
  timeToClear?: number;
  lruSize?: number;
  mruSize?: number;
}

export interface CreateTimeoutResult {
  create(key: string, removeFromStore: (key: string) => any): void;
  cancel(key: string): void;
}

export interface Cache<V = any> {
  keys(): string[];
  size(): number;
  has(key: string): boolean;
  get(key: string): V | null;
  set(key: string, value: V): void;
  remove(key: string): void;
}

export interface GlobalConfig extends Config {}
