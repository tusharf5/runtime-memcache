import { Cache, GlobalConfig } from './types';
import { LRULinkedList } from './utils/LRULinkedList';

function createStore<V>(config: Required<GlobalConfig>): Cache<V> {
  const store = new LRULinkedList<V>(config);

  function get(key: string): V {
    const val = store.get(key);
    if (val) {
      return val;
    }
    return null;
  }

  function remove(key: string) {
    store.remove(key);
    return true;
  }

  function has(key: string) {
    return store.has(key);
  }

  function size(): number {
    return store.size;
  }

  function keys(): string[] {
    return store.keys();
  }

  function set(key: string, value: V) {
    store.addNodeToHead(key, value);
    return true;
  }

  return {
    keys,
    size,
    get,
    set,
    remove,
    has,
  };
}

export default createStore;
