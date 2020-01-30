const createStore = require('../lib/index').default;

describe('lru store', () => {
  let store;
  beforeEach(() => {
    store = createStore({ policy: 'lru' });
  });
  test('set get remove has', () => {
    store.set('1', 1);
    store.set('2', 2);
    store.set('3', 3);

    expect(store.get('1')).toBe(1);
    expect(store.get('2')).toBe(2);
    expect(store.get('3')).toBe(3);

    expect(store.has('3')).toBe(true);
    expect(store.has('4')).toBe(false);

    expect(store.get('4')).toBe(null);

    store.remove('1');
    expect(store.get('1')).toBe(null);

    store.remove('2');
    expect(store.has('2')).toBe(false);
    expect(store.get('2')).toBe(null);

    store.set('1', 1);
    expect(store.get('1')).toBe(1);
    expect(store.has('1')).toBe(true);
  });

  // write when the store has size api
  test.todo('should only have the set number of items at a time');

  test('should evict items as per the policy', () => {
    store = createStore({
      policy: 'lru',
      lruSize: 3,
    });

    // []
    store.set('1', 1);
    // [1]
    store.set('2', 2);
    // [2, 1]
    store.set('3', 3);
    // [3, 2, 1]

    expect(store.get('1')).toBe(1);
    // [1, 3, 2]
    expect(store.get('2')).toBe(2);
    // [2, 1, 3]
    expect(store.get('3')).toBe(3);
    // [3, 2, 1]

    store.set('4', 4);
    // [4, 3, 2]

    expect(store.get('1')).toBe(null);
    // [4, 3, 2]
    expect(store.get('2')).toBe(2);
    // [2, 4, 3]
    expect(store.get('3')).toBe(3);
    // [3, 2, 4]
    expect(store.get('4')).toBe(4);
    // [4, 3, 2]

    store.set('5', 5);
    // [5, 4, 3]
    expect(store.get('2')).toBe(null);

    store.set('6', 6);
    // [6, 5, 4]
    expect(store.get('3')).toBe(null);

    store.set('7', 7);
    // [7, 6, 5]
    expect(store.get('4')).toBe(null);

    store.set('8', 8);
    // [8, 7, 6]
    expect(store.get('5')).toBe(null);

    expect(store.get('6')).toBe(6);
    // [6, 8, 7]
    expect(store.get('7')).toBe(7);
    // [7, 6, 8]
    expect(store.get('8')).toBe(8);
    // [8, 7, 6]

    store.get(6);
    // [6, 8, 7]
    store.set('9', 9);
    // [9, 6, 8]

    expect(store.get('8')).toBe(8);
    // [8, 9, 6]
    expect(store.get('6')).toBe(6);
    // [6, 8, 9]
    expect(store.get('9')).toBe(9);
    // [9, 6, 8]
    expect(store.get('7')).toBe(null);
  });
});

describe('mru store', () => {
  let store;
  beforeEach(() => {
    store = createStore({ policy: 'mru' });
  });
  test('set get remove has', () => {
    store.set('1', 1);
    store.set('2', 2);
    store.set('3', 3);

    expect(store.get('1')).toBe(1);
    expect(store.get('2')).toBe(2);
    expect(store.get('3')).toBe(3);

    expect(store.has('3')).toBe(true);
    expect(store.has('4')).toBe(false);

    expect(store.get('4')).toBe(null);

    store.remove('1');
    expect(store.get('1')).toBe(null);

    store.remove('2');
    expect(store.has('2')).toBe(false);
    expect(store.get('2')).toBe(null);

    store.set('1', 1);
    expect(store.get('1')).toBe(1);
    expect(store.has('1')).toBe(true);
  });
});

describe('timeout store', () => {
  let store;
  beforeEach(() => {
    store = createStore({ policy: 'timeout' });
  });
  test('set get remove has', () => {
    store.set('1', 1);
    store.set('2', 2);
    store.set('3', 3);

    expect(store.get('1')).toBe(1);
    expect(store.get('2')).toBe(2);
    expect(store.get('3')).toBe(3);

    expect(store.get('4')).toBe(null);

    expect(store.has('1')).toBe(true);
    expect(store.has('2')).toBe(true);
    expect(store.has('4')).toBe(false);

    store.remove('1');
    expect(store.has('1')).toBe(false);
    expect(store.get('1')).toBe(null);

    store.remove('2');
    expect(store.get('2')).toBe(null);

    store.set('1', 1);
    expect(store.get('1')).toBe(1);

    store.remove('1');
    store.remove('3');
  });
});
