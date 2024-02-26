import TimeConverter from "./TimeConverter";

test('time is converted correctly for supported units', () => {
  const timeConverter = new TimeConverter();
  const testCases = [
    [1, 's', 's', 1],
    [1, 'm', 's', 60],
    [1, 'h', 's', 60 * 60],
    [1, 'd', 's', 24 * 60 * 60],
    [1, 'w', 's', 7 * 24 * 60 * 60],
    [1, 's', 'h', 1 / 60 / 60],
    [1, 'm', 'd', 1 / 24 / 60],
  ];

  for (const index in testCases) {
    const [time, sourceUnit, targetUnit, convertedResult] = testCases[index]
    expect(timeConverter.convert(+time, `${sourceUnit}`, `${targetUnit}`)).toBe(convertedResult);
  }
});

test('exception is thrown when conversion for non-existing source unit is requested', () => {
  const timeConverter = new TimeConverter();
  expect(() => timeConverter.convert(12, 'XX', 'd'))
      .toThrow(new Error(`Conversion XX=>d is not supported!`));
});

test('exception is thrown when conversion for non-existing target unit is requested', () => {
  const timeConverter = new TimeConverter();
  expect(
    () => timeConverter.convert(12, 'd', 'XX'))
    .toThrow(new Error(`Conversion d=>XX is not supported!`)
    );
});