import Cache from './index';

const cache = new Cache();
cache.set('testkey', 'testvalue');

test('User can create key', () => {
    expect(() => cache.set('key', { test: true })).not.toThrow();
});

test('User can retrieve key', () => {
    expect(cache.get('testkey')).toBe('testvalue');
});
