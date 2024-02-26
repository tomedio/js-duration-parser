import TimeGroups from "./TimeGroups";
import TimeIdentifiers from "./TimeIdentifiers";
import {TimeGroup} from "./TimeGroups.types";

const timeIdentifiers = new TimeIdentifiers();

describe('extractTimeGroups()', () => {
  test('time groups are extracted correctly for existing units', () => {
    const timeGroups = new TimeGroups(timeIdentifiers);

    const testCases = [
      ['2d30m', ['2d', '30m']],
      [' 1d 30m12s  ', ['1d', '30m', '12s']],
      ['2w 3d14m', ['2w', '3d', '14m']],
      ['1w 14s', ['1w', '14s']]
    ];
    const locale = 'en';

    for (const index in testCases) {
      const [duration, extractedGroup] = testCases[index]
      expect(timeGroups.extractTimeGroups(`${duration}`, locale)).toStrictEqual(extractedGroup);
    }
  });

  test('time groups are extracted correctly for upper-case units', () => {
    const timeGroups = new TimeGroups(timeIdentifiers);
    expect(timeGroups.extractTimeGroups('2D3h14S', 'en')).toStrictEqual(['2d', '3h', '14s']);
  });

  test('no groups is extracted for reordered correct units', () => {
    const timeGroups = new TimeGroups(timeIdentifiers);
    expect(timeGroups.extractTimeGroups('3h 2w 5d', 'en')).toStrictEqual([]);
  });

  test('no groups is extracted when one unit is not supported', () => {
    const timeGroups = new TimeGroups(timeIdentifiers);
    expect(timeGroups.extractTimeGroups('2d3g14m', 'en')).toStrictEqual([]);
  });

  test('no groups is extracted for empty duration string', () => {
    const timeGroups = new TimeGroups(timeIdentifiers);
    expect(timeGroups.extractTimeGroups('', 'en')).toStrictEqual([]);
  });

  test('no groups is extracted for invalid string', () => {
    const timeGroups = new TimeGroups(timeIdentifiers);
    expect(timeGroups.extractTimeGroups('aaa', 'en')).toStrictEqual([]);
  });
});

describe('parseTimeGroup()', () => {
  test('time group is parsed correctly', () => {
    const timeGroups = new TimeGroups(timeIdentifiers);

    const testCases = [
      ['2d', {time: 2, unit: 'd'}],
      ['15 m', {time: 15, unit: 'm'}],
      ['  20 d ', {time: 20, unit: 'd'}],
    ];
    const locale = 'en';

    for (const index in testCases) {
      const timeGroup: string = testCases[index][0] as string
      const parsedTime: TimeGroup = testCases[index][1] as TimeGroup
      expect(timeGroups.parseTimeGroup(timeGroup, locale)).toStrictEqual(parsedTime);
    }
  });

  test('null is returned for group with non-existing unit', () => {
    const timeGroups = new TimeGroups(timeIdentifiers);
    expect(timeGroups.parseTimeGroup('2a', 'en')).toBeNull();
  });

  test('null is returned for group with empty content', () => {
    const timeGroups = new TimeGroups(timeIdentifiers);
    expect(timeGroups.parseTimeGroup('', 'en')).toBeNull();
  });
});

describe('buildTimeGroup()', () => {
  test('time group built correctly', () => {
    const timeGroups = new TimeGroups(timeIdentifiers);

    const testCases = [
      [{time: 2, unit: 'd'}, '2d'],
      [{time: 2, unit: ' d '}, '2d'],
    ];

    for (const index in testCases) {
      const parsedTime: TimeGroup = testCases[index][0] as TimeGroup
      const timeGroup: string = testCases[index][1] as string
      expect(timeGroups.buildTimeGroup(parsedTime)).toBe(timeGroup);
    }
  });

  test('null is returned for group with empty content', () => {
    const timeGroups = new TimeGroups(timeIdentifiers);
    expect(() => timeGroups.buildTimeGroup({time: 12}))
      .toThrow(new Error(`Wrong input object is passed`));
  });
});

describe('composeDuration()', () => {
  const groups = [
    '12d',
    '3m',
  ];

  test('duration is composed based on groups using default separator', () => {
    const timeGroups = new TimeGroups(timeIdentifiers);
    expect(timeGroups.composeDuration(groups)).toBe('12d 3m');
  });

  test('duration is composed based on groups using custom separator', () => {
    const timeGroups = new TimeGroups(timeIdentifiers);
    expect(timeGroups.composeDuration(groups, '')).toBe('12d3m');
  });
});