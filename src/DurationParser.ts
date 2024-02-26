import TimeConverter from "./TimeConverter";
import TimeIdentifiers from "./TimeIdentifiers";
import TimeGroups from "./TimeGroups";

class DurationParser {
  #locale;

  #timeConverter;

  #timeIdentifiers;

  #timeGroups;

  /**
   * @param {string} locale Locale used for parsing duration
   * @param {TimeIdentifiers|null} customTimeIdentifiers Custom TimeIdentifiers object with added localized identifiers
   */
  constructor(locale: string = 'en', customTimeIdentifiers: TimeIdentifiers|null = null) {
    this.#locale = locale;
    this.#timeConverter = new TimeConverter();
    this.#timeIdentifiers = customTimeIdentifiers ?? new TimeIdentifiers();
    this.#timeGroups = new TimeGroups(this.#timeIdentifiers);
  }

  /**
   * Converts given time group into number in target unit
   *
   * @param {string} timeGroup Time group being a single parsed duration, eg. "2w", "30m", etc.
   * @param {string} targetUnit Target time unit expressed in 'en' locale
   * @returns {number}
   */
  #convertTimeGroup(timeGroup: string, targetUnit: string): number {
    const parsedGroup = this.#timeGroups.parseTimeGroup(timeGroup, this.#locale);
    return this.#timeConverter.convert(
      parsedGroup.time,
      this.#timeIdentifiers.getInternalUnit(parsedGroup.unit, this.#locale),
      targetUnit
    );
  }

  /**
   * Return duration length from input expressed in target units
   *
   * @param {string} input Input duration string expressed in human-like pattern
   * @param {string} targetUnit Identifier of target time unit
   * @returns {number|null}
   */
  parse(input: string, targetUnit: string = 'm'): number | null {
    if (!input) {
      return null;
    }
    const timeGroups = this.#timeGroups.extractTimeGroups(input, this.#locale);
    if (timeGroups.length === 0) {
      return null;
    }
    return timeGroups.reduce(
      (totalTime, currentTimeGroup) =>
        totalTime + this.#convertTimeGroup(currentTimeGroup, targetUnit),
      0,
    );
  }

  /**
   * Create duration string from time amount
   *
   * @param {number} time Input time amount expressed in source time unit
   * @param {string} sourceUnit Source time unit identifier
   * @param {string} groupSeparator Group separator used to join time groups in output duration string
   * @returns {string}
   */
  compose(time: number, sourceUnit: string = 'm', groupSeparator: string = ' '): string {
    if (!time) {
      return `0${sourceUnit}`;
    }
    const usedIdentifiers = this.#timeIdentifiers.get(this.#locale);
    const orderedInternalUnits = ['w', 'd', 'h', 'm', 's'];

    const timeGroups = [];
    let remainingTime = time;
    // eslint-disable-next-line no-restricted-syntax,guard-for-in
    for (const currentInternalUnit of orderedInternalUnits) {
      const convertedTime = parseInt(
        this.#timeConverter.convert(remainingTime, sourceUnit, currentInternalUnit),
      );
      const timeUnit = usedIdentifiers[currentInternalUnit] ?? null;
      if (convertedTime >= 1.0 && timeUnit !== null) {
        timeGroups.push(this.#timeGroups.buildTimeGroup({time: convertedTime, unit: timeUnit}));
        const timeToDiff = this.#timeConverter.convert(
          convertedTime,
          currentInternalUnit,
          sourceUnit,
        );
        remainingTime -= timeToDiff;
      }
    }

    return this.#timeGroups.composeDuration(timeGroups, groupSeparator);
  }
}

export default DurationParser;