import DurationParser from "./DurationParser";
import TimeIdentifiers from "./TimeIdentifiers";
import {parse} from "@babel/core";

describe('parse()', () => {
  test('duration is parsed correctly for \'en\' locale', () => {
    const durationParser = new DurationParser();

    const testCases = [
      [' 1d 30m12s  ', 's', '88212'],
      ['12s', 's', '12'],
      ['1h 1s', 's', '3601'],
      ['1H1m', 'm', '61'],
      ['1h 1m 30s', 'm', '61.5'],
      ['30s', 'm', '0.5']
    ];

    for (const index in testCases) {
      const [input, targetUnit, parsedResult] = testCases[index];
      expect(durationParser.parse(input, targetUnit)).toBe(+parsedResult);
    }
  });

  test('duration is parsed using default target unit', () => {
    const durationParser = new DurationParser('en');
    expect(durationParser.parse('10m')).toBe(10);
  });

  test('zero duration is parsed as 0', () => {
    const durationParser = new DurationParser('en');
    expect(durationParser.parse('0m', 's')).toBe(0);
  });

  test('empty duration is parsed as null', () => {
    const durationParser = new DurationParser('en');
    expect(durationParser.parse('', 's')).toBeNull();
  });

  test('invalid duration is parsed as null', () => {
    const durationParser = new DurationParser('en');
    expect(durationParser.parse('2a', 's')).toBeNull();
  });

  test('duration with localized units is parsed correctly', () => {
    const durationParser = new DurationParser('pl', (new TimeIdentifiers()).add('pl', {
      s: 's',
      m: 'm',
      h: 'g',
      d: 'd',
      w: 't',
    }));

    const testCases = [
      ['2d 1g 15m', 'm', '2955'],
      ['1g 1m', 'm', '61'],
      ['36g', 'd', '1.5']
    ];

    for (const index in testCases) {
      const [input, targetUnit, parsedResult] = testCases[index];
      expect(durationParser.parse(input, targetUnit)).toBe(+parsedResult);
    }
  });

  test('duration with non-translated units is parsed as null', () => {
    const durationParser = new DurationParser('pl-poor', (new TimeIdentifiers()).add('pl-poor', {
      h: 'g',
      d: 'd'
    }));
    expect(durationParser.parse('2m', 's')).toBeNull();
  });

  test('non-translated source unit is taken into account when duration is parsed', () => {
    const durationParser = new DurationParser('pl-poor', (new TimeIdentifiers()).add('pl-poor', {
      h: 'g',
      d: 'd'
    }));
    expect(durationParser.parse('2g', 'h')).toBe(2);
  });
});

describe('compose()', () => {
  test('duration is composed correctly for \'en\' locale', () => {
    const durationParser = new DurationParser('en');

    const testCases = [
      [88212, 's', ' ', '1d 30m 12s'],
      [12, 's', ' ', '12s'],
      [0.5, 'm', ' ', '30s'],
      [61, 'm', '', '1h1m'],
      [61.5, 'm', ' ', '1h 1m 30s']
    ];

    for (const index in testCases) {
      const [time, sourceUnit, groupSeparator, composedResult] = testCases[index];
      expect(durationParser.compose(+time, `${sourceUnit}`, `${groupSeparator}`)).toBe(composedResult);
    }
  });

  test('0 is composed as null', () => {
    const durationParser = new DurationParser('en');
    expect(durationParser.compose(0, 's')).toBe('0s');
  });

  test('duration is composed correctly with default source unit and separator', () => {
    const durationParser = new DurationParser('en');
    expect(durationParser.compose(61)).toBe('1h 1m');
  });

  test('duration is composed correctly for added \'pl\' locale', () => {
    const durationParser = new DurationParser('pl', (new TimeIdentifiers()).add('pl', {
      s: 's',
      m: 'm',
      h: 'g',
      d: 'd',
      w: 't',
    }));
    expect(durationParser.compose(61, 'h')).toBe('2d 13g');
  });

  test('non-existing units are ignored when duration is composed', () => {
    const durationParser = new DurationParser('pl-poor', (new TimeIdentifiers()).add('pl-poor', {
      h: 'g',
      d: 'd'
    }));
    expect(durationParser.compose(61, 'm')).toBe('1g');
  });

  test('non-translated source unit is taken into account when duration is composed', () => {
    const durationParser = new DurationParser('pl-poor', (new TimeIdentifiers()).add('pl-poor', {
      h: 'g',
      d: 'd'
    }));
    expect(durationParser.compose(61, 'h')).toBe('2d 13g');
  });
});