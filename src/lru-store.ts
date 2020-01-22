import { CreateStoreResult, GlobalConfig } from './types';
import { LRULinkedList } from './utils/LRULinkedList';

function createStore<K extends string | number | symbol, V>(
  config: Required<GlobalConfig>,
): CreateStoreResult<K> {
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

  function set(key: K, value: any) {
    store.addNodeToHead(key, value);
    return true;
  }

  return {
    get,
    set,
    remove,
  };
}

export default createStore;
