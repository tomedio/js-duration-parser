import TimeIdentifiers from "./TimeIdentifiers";


const enTimeIdentifiers = {
  s: 's',
  m: 'm',
  h: 'h',
  d: 'd',
  w: 'w',
};

test('\'en\' version is registered at start', () => {
  const timeIdentifiers = new TimeIdentifiers();
  expect(timeIdentifiers.get('en')).toStrictEqual(enTimeIdentifiers);
});

test('\'en\' version returned for non-existing locale', () => {
  const timeIdentifiers = new TimeIdentifiers();
  expect(timeIdentifiers.get('XXX')).toStrictEqual(enTimeIdentifiers);
});

test('\'pl\' version is registered correctly', () => {
  const plTimeIdentifiers = {
    s: 's',
    m: 'm',
    h: 'g',
    d: 'd',
    w: 't',
  };
  const timeIdentifiers = new TimeIdentifiers();
  timeIdentifiers.add('pl', plTimeIdentifiers);
  expect(timeIdentifiers.get('pl')).toStrictEqual(plTimeIdentifiers);
});

test('existing internal separator is correctly returned for selected locale', () => {
  const testingTimeIdentifiers = {
    w: 't',
  };
  const timeIdentifiers = new TimeIdentifiers();
  timeIdentifiers.add('test', testingTimeIdentifiers);
  expect(timeIdentifiers.getInternalUnit('t', 'test')).toBe('w');
});

test('null is returned for selected locale and non-existing separator', () => {
  const testingTimeIdentifiers = {
    w: 't',
  };
  const timeIdentifiers = new TimeIdentifiers();
  timeIdentifiers.add('test', testingTimeIdentifiers);
  expect(timeIdentifiers.getInternalUnit('x', 'test')).toBeNull();
});