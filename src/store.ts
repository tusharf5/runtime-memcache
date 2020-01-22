import createTimeoutStore from './timeout-store';
import createLruStore from './lru-store';

import { UserConfig, CreateStoreResult, GlobalConfig } from './types';

export const defaultConfig: Required<GlobalConfig> = {
  strategy: 'timeout',
  timeToClear: 7200000, // 2 hours
  lruSize: 500,
};

function createStore<K extends string | number | symbol = string, V = any>(
  userConfig?: UserConfig,
): CreateStoreResult<K> {
  let userConfigVerf = {};
  if (typeof userConfig === 'object') {
    userConfigVerf = userConfig;
  }
  const config: Required<GlobalConfig> = Object.assign({}, defaultConfig, userConfigVerf);

  switch (config.strategy) {
    case 'timeout':
      return createTimeoutStore<K>(config);
    case 'lru':
      return createLruStore<K, V>(config);
    default:
      throw new Error(config.strategy + ' is not a supported strategy.');
  }
}

export { UserConfig };

export default createStore;
