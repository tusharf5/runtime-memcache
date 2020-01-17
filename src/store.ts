import createHashStore, { UserConfig, CreateHashStoreResult } from './hash-store';

function createStore<K = any>(userConfig: UserConfig): CreateHashStoreResult<K> {
  const store = createHashStore<K>(userConfig);
  return store;
}

export { UserConfig };

export default createStore;
