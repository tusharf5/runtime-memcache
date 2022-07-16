import { CreateTimeoutResult } from '../types';

export const createTimeAwareMapObserver = (timeToClear: number): CreateTimeoutResult => {
  const timeouts = new Map<string, NodeJS.Timer>();
  return {
    create: (key: string, removeFromStore: (key: string) => any) => {
      const timer = setTimeout(() => {
        removeFromStore(key);
      }, timeToClear);
      timeouts.set(key, timer);
    },
    cancel: (key: string) => {
      if (timeouts.has(key)) {
        const timer = timeouts.get(key);
        timeouts.delete(key);
        clearTimeout(timer);
      }
    },
  };
};
