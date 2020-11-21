import createTimeoutStore from './timeout-store';
import createLruStore from './lru-store';
import createMruStore from './mru-store';
import createTLruStore from './tlru-store';

import { Config, Cache, GlobalConfig } from './types';

export const defaultConfig: Required<GlobalConfig> = {
  strategy: 'lru',
  policy: 'lru',
  timeToClear: 7200000, // 2 hours
  lruSize: 500,
  mruSize: 500,
};

function createStore<K extends string, V = any>(userConfig?: Config): Cache<K, V> {
  let userConfigVerf: Config = {};
  if (typeof userConfig === 'object') {
    userConfigVerf = userConfig;
  }

  const config: Required<GlobalConfig> = Object.assign({}, defaultConfig, userConfigVerf);

  switch (config.policy) {
    case 'timeout':
      return createTimeoutStore<K, V>(config);
    case 'lru':
      return createLruStore<K, V>(config);
    case 'mru':
      return createMruStore<K, V>(config);
    case 'tlru':
      return createTLruStore<K, V>(config);
    default:
      throw new Error(config.policy + ' is not a supported policy.');
  }
}

export default createStore;
