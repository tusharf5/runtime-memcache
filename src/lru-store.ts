import { Cache, GlobalConfig } from './types';
import { LRULinkedList } from './utils/LRULinkedList';

function createStore<K, V>(config: Required<GlobalConfig>): Cache<K, V> {
  const store = new LRULinkedList<K, V>(config);

  function get(key: K) {
    const val = store.get(key);
    if (val) {
      return val;
    }
    return null;
  }

  function remove(key: K) {
    store.remove(key);
    return true;
  }

  function has(key: K) {
    return store.has(key);
  }

  function size(): number {
    return store.size;
  }

  function keys(): K[] {
    return store.keys();
  }

  function set(key: K, value: any) {
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
