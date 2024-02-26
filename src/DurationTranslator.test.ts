import TimeIdentifiers from "./TimeIdentifiers";
import DurationTranslator from "./DurationTranslator";

test('duration is translated correctly from \'en\' to \'pl\' locale', () => {
  const timeIdentifiers = (new TimeIdentifiers()).add('pl', {
    s: 's',
    m: 'm',
    h: 'g',
    d: 'd',
    w: 't',
  });
  const durationTranslator = new DurationTranslator(timeIdentifiers);
  expect(durationTranslator.translate('5w 3d 2h 13m 20s', 'en', 'pl'))
    .toBe('5t 3d 2g 13m 20s');
});