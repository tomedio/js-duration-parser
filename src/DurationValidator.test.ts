import DurationValidator from "./DurationValidator";
import TimeIdentifiers from "./TimeIdentifiers";


test('validator validates correct duration', () => {
  const durationValidator = new DurationValidator();
  expect(durationValidator.validate('2h 30m')).toBeTruthy();
});

test('validator validates incorrect duration', () => {
  const durationValidator = new DurationValidator();
  expect(durationValidator.validate('2dni')).toBeFalsy();
});

test('validator validates empty duration', () => {
  const durationValidator = new DurationValidator();
  expect(durationValidator.validate('')).toBeFalsy();
});

test('validator validates reordered correct duration', () => {
  const durationValidator = new DurationValidator();
  expect(durationValidator.validate('2h 3d')).toBeFalsy();
});

test('validator validates duration using \'pl\' locale', () => {
  const timeIdentifiers = new TimeIdentifiers();
  timeIdentifiers.add('pl', {
    s: 's',
    m: 'm',
    h: 'g',
    d: 'd',
    w: 't',
  });
  const durationValidator = new DurationValidator(timeIdentifiers);
  expect(durationValidator.validate('2g 3m', 'pl')).toBeTruthy();
  expect(durationValidator.validate('2a 3m', 'pl')).toBeFalsy();
});

test('validator validates correct numeric duration', () => {
  const durationValidator = new DurationValidator();
  expect(durationValidator.validate(' 13  ')).toBeTruthy();
});