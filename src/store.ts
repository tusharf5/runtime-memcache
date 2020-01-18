import createTimeoutStore from './timeout-store';
import createLruStore from './lru-store';

import { UserConfig, CreateStoreResult, GlobalConfig } from './types';

export const defaultConfig: GlobalConfig = {
  strategy: 'timeout',
  timeToClear: 7200000, // 2 hours
};

function createStore<K = any>(userConfig?: UserConfig): CreateStoreResult<K> {
  let userConfigVerf = {};
  if (typeof userConfig === 'object') {
    userConfigVerf = userConfig;
  }
  const config: GlobalConfig = Object.assign({}, defaultConfig, userConfigVerf);

  switch (config.strategy) {
    case 'timeout':
      return createTimeoutStore<K>(config);
    case 'lru':
      return createLruStore<K>(config);
    default:
      throw new Error(config.strategy + ' is not a supported strategy.');
  }
}

export { UserConfig };

export default createStore;
