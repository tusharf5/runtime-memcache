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

function createStore<V = any>(userConfig?: Config): Cache<V> {
  let userConfigVerf: Config = {};
  if (typeof userConfig === 'object') {
    userConfigVerf = userConfig;
  }

  const config: Required<GlobalConfig> = Object.assign({}, defaultConfig, userConfigVerf);

  switch (config.policy) {
    case 'timeout':
      return createTimeoutStore<V>(config);
    case 'lru':
      return createLruStore<V>(config);
    case 'mru':
      return createMruStore<V>(config);
    case 'tlru':
      return createTLruStore<V>(config);
    default:
      throw new Error(config.policy + ' is not a supported policy.');
  }
}

export default createStore;
