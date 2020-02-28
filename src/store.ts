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

function createStore<K extends string | number | symbol = string, V = any>(
  userConfig?: Config,
): Cache<K> {
  let userConfigVerf: Config = {};
  if (typeof userConfig === 'object') {
    userConfigVerf = userConfig;
  }
  if (userConfigVerf.strategy) {
    userConfigVerf.policy = userConfigVerf.policy || userConfigVerf.strategy;
    console.warn(
      'runtime-memcache:: Use the `policy` config option instead of `strategy`. `strategy` option is deprecated and will be removed in the next major version',
    );
  }
  const config: Required<GlobalConfig> = Object.assign({}, defaultConfig, userConfigVerf);

  switch (config.policy) {
    case 'timeout':
      return createTimeoutStore<K>(config);
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
