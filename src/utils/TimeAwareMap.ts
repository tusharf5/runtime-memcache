import { CreateTimeoutResult } from '../types';

export const createTimeAwareMapObserver = <K>(timeToClear: number): CreateTimeoutResult<K> => {
  const timeouts = new Map<K, NodeJS.Timer>();
  return {
    create: (key: K, removeFromStore: (key: K) => any) => {
      const timer = setTimeout(() => {
        removeFromStore(key);
      }, timeToClear);
      timeouts.set(key, timer);
    },
    cancel: (key: K) => {
      if (timeouts.has(key)) {
        const timer = timeouts.get(key);
        timeouts.delete(key);
        clearTimeout(timer);
      }
    },
  };
};
