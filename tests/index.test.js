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

  test('size should update on various operations', () => {
    store.set('1', 1);
    expect(store.size()).toBe(1);

    store.set('2', 2);
    store.set('3', 3);
    expect(store.size()).toBe(3);

    store.remove('1');
    expect(store.size()).toBe(2);

    for (let i = 100; i < 400; i++) {
      store.set(String(i), i);
    }

    expect(store.size()).toBe(302);
  });

  test('size should respect if there is a value set', () => {
    store = createStore({ policy: 'lru', lruSize: 3 });

    store.set('1', 1);
    expect(store.size()).toBe(1);

    store.set('2', 2);
    store.set('3', 3);
    expect(store.size()).toBe(3);

    store.remove('1');
    expect(store.size()).toBe(2);

    for (let i = 100; i < 400; i++) {
      store.set(String(i), i);
    }

    expect(store.size()).toBe(3);
  });

  test('should have the correct keys at a given point of time', () => {
    store = createStore({
      policy: 'lru',
      lruSize: 3,
    });

    // []
    expect(store.keys().sort()).toEqual([].sort());
    store.set('1', 1);
    // [1]
    expect(store.keys().sort()).toEqual(['1'].sort());
    store.set('2', 2);
    // [2, 1]
    expect(store.keys().sort()).toEqual(['2', '1'].sort());
    store.set('3', 3);
    // [3, 2, 1]
    expect(store.keys().sort()).toEqual(['3', '2', '1'].sort());

    store.get('1');
    // [1, 3, 2]
    expect(store.keys().sort()).toEqual(['1', '3', '2'].sort());
    store.get('2');
    // [2, 1, 3]
    expect(store.keys().sort()).toEqual(['2', '1', '3'].sort());
    store.get('3');
    // [3, 2, 1]
    expect(store.keys().sort()).toEqual(['3', '2', '1'].sort());

    store.set('4', 4);
    // [4, 3, 2]
    expect(store.keys().sort()).toEqual(['4', '3', '2'].sort());

    store.get('1');
    // [4, 3, 2]
    expect(store.keys().sort()).toEqual(['4', '3', '2'].sort());
    store.get('2');
    // [2, 4, 3]
    expect(store.keys().sort()).toEqual(['2', '4', '3'].sort());
    store.get('3');
    // [3, 2, 4]
    expect(store.keys().sort()).toEqual(['3', '2', '4'].sort());
    store.get('4');
    // [4, 3, 2]
    expect(store.keys().sort()).toEqual(['4', '3', '2'].sort());

    store.set('5', 5);
    // [5, 4, 3]
    expect(store.keys().sort()).toEqual(['5', '4', '3'].sort());
    store.get('2');

    store.set('6', 6);
    // [6, 5, 4]
    expect(store.keys().sort()).toEqual(['6', '5', '4'].sort());
    store.get('3');

    store.set('7', 7);
    // [7, 6, 5]
    expect(store.keys().sort()).toEqual(['7', '6', '5'].sort());
    store.get('4');

    store.set('8', 8);
    // [8, 7, 6]
    expect(store.keys().sort()).toEqual(['8', '7', '6'].sort());
    store.get('5');

    store.get('6');
    // [6, 8, 7]
    expect(store.keys().sort()).toEqual(['6', '8', '7'].sort());
    store.get('7');
    // [7, 6, 8]
    expect(store.keys().sort()).toEqual(['7', '6', '8'].sort());
    store.get('8');
    // [8, 7, 6]
    expect(store.keys().sort()).toEqual(['8', '7', '6'].sort());

    store.get('6');
    // [6, 8, 7]
    expect(store.keys().sort()).toEqual(['6', '8', '7'].sort());
    store.set('9', 9);

    // [9, 6, 8]
    expect(store.keys().sort()).toEqual(['9', '6', '8'].sort());
    store.get('8');

    // [8, 9, 6]
    expect(store.keys().sort()).toEqual(['8', '9', '6'].sort());
    store.get('6');
    // [6, 8, 9]
    expect(store.keys().sort()).toEqual(['6', '8', '9'].sort());
    store.get('9');
    // [9, 6, 8]
    expect(store.keys().sort()).toEqual(['9', '6', '8'].sort());
    store.get('7');
  });

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

    store.get('6');
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

  test('size should update on various operations', () => {
    store.set('1', 1);
    expect(store.size()).toBe(1);

    store.set('2', 2);
    store.set('3', 3);
    expect(store.size()).toBe(3);

    store.remove('1');
    expect(store.size()).toBe(2);

    for (let i = 100; i < 400; i++) {
      store.set(String(i), i);
    }

    expect(store.size()).toBe(302);
  });

  test('size should respect if there is a value set', () => {
    store = createStore({ policy: 'lru', lruSize: 3 });

    store.set('1', 1);
    expect(store.size()).toBe(1);

    store.set('2', 2);
    store.set('3', 3);
    expect(store.size()).toBe(3);

    store.remove('1');
    expect(store.size()).toBe(2);

    for (let i = 100; i < 400; i++) {
      store.set(String(i), i);
    }

    expect(store.size()).toBe(3);
  });

  test('should evict items as per the policy', () => {
    store = createStore({
      policy: 'mru',
      mruSize: 3,
    });

    // []
    store.set('1', 1);
    // [1]
    store.set('2', 2);
    // [2, 1]
    store.set('3', 3);
    // [3, 2, 1]
    expect(store.get('1')).toBe(1);
    // [3, 2, 1]
    expect(store.get('2')).toBe(2);
    // [1, 3, 2]
    expect(store.get('3')).toBe(3);
    // [2, 1, 3]
    store.set('4', 4);
    // [4, 2, 1]
    expect(store.get('1')).toBe(1);
    // [4, 2, 1]
    expect(store.get('2')).toBe(2);
    // [4, 1, 2]
    expect(store.get('3')).toBe(null);
    expect(store.get('4')).toBe(4);
    // [1, 2, 4]
    store.set('5', 5);
    // [5, 1, 2]
    expect(store.get('2')).toBe(2);
    // [5, 1, 2]
    store.set('6', 6);
    // [6, 5, 1]
    expect(store.get('3')).toBe(null);

    store.set('7', 7);
    // [7, 6, 5]
    expect(store.get('4')).toBe(null);
    // [7, 6, 5]
    store.set('8', 8);
    // [8, 7, 6]
    expect(store.get('5')).toBe(null);
    // [8, 7, 6]
    expect(store.get('6')).toBe(6);
    // [8, 7, 6]
    expect(store.get('7')).toBe(7);
    // [8, 6, 7]
    expect(store.get('8')).toBe(8);
    // [6, 7, 8]
    store.get('6');
    // [7, 8, 6]
    store.set('9', 9);
    // [9, 7, 8]
    expect(store.get('8')).toBe(8);
    // [9, 7, 8]
    expect(store.get('6')).toBe(null);
    // [9, 7, 8]
    expect(store.get('9')).toBe(9);
    // [7, 8, 9]
    expect(store.get('7')).toBe(7);
    // [8, 9, 7]
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

  test('size should update on various operations', () => {
    store.set('1', 1);
    expect(store.size()).toBe(1);

    store.set('2', 2);
    store.set('3', 3);
    expect(store.size()).toBe(3);

    store.remove('1');
    expect(store.size()).toBe(2);

    for (let i = 100; i < 400; i++) {
      store.set(String(i), i);
    }

    expect(store.size()).toBe(302);

    for (let i = 100; i < 400; i++) {
      store.remove(String(i));
    }

    store.remove('2');
    store.remove('3');

    expect(store.size()).toBe(0);
  });

  test('size should respect if there is a value set', () => {
    store = createStore({ policy: 'timeout' });

    store.set('1', 1);
    expect(store.size()).toBe(1);

    store.set('2', 2);
    store.set('3', 3);
    expect(store.size()).toBe(3);

    store.remove('1');
    expect(store.size()).toBe(2);

    for (let i = 100; i < 400; i++) {
      store.set(String(i), i);
    }

    expect(store.size()).toBe(302);

    store.remove('2');
    store.remove('3');

    for (let i = 100; i < 400; i++) {
      store.remove(String(i));
    }

    expect(store.size()).toBe(0);
  });

  test('should evict items as per the policy', callback => {
    store = createStore({ policy: 'timeout', timeToClear: 3000 });

    store.set('1', 1);

    let done = false;

    setTimeout(() => {
      expect(store.get('1')).toBe(1);
      if (done) {
        callback();
      } else {
        done = true;
      }
    }, 2000);

    setTimeout(() => {
      expect(store.get('1')).toBe(null);
      if (done) {
        callback();
      } else {
        done = true;
      }
    }, 4000);
  });
});
