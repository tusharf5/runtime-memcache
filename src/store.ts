import createHashStore, { UserConfig, CreateHashStoreResult } from './hash-store';

function createStore<K>(userConfig: UserConfig): CreateHashStoreResult<K> {
  const store = createHashStore<K>(userConfig);
  return store;
}

export default createStore;
