import createHashStore, { UserConfig, CreateHashStoreResult } from './hash-store';

function createStore<K = any>(userConfig?: UserConfig): CreateHashStoreResult<K> {
  let config = {};
  if (typeof userConfig === 'object') {
    config = userConfig;
  }
  const store = createHashStore<K>(config);
  return store;
}

export { UserConfig };

export default createStore;
