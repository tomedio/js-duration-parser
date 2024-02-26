import DurationParser from "./DurationParser";
import TimeIdentifiers from "./TimeIdentifiers";

class DurationTranslator {
  #timeIdentifiers;

  /* istanbul ignore next */
  /**
   * @param {TimeIdentifiers} timeIdentifiers
   */
  constructor(timeIdentifiers: TimeIdentifiers = new TimeIdentifiers()) {
    this.#timeIdentifiers = timeIdentifiers;
  }

  /**
   * Translate duration string from source to target locale
   *
   * @param {string} duration Input duration string
   * @param {string} sourceLocale Source locale name
   * @param {string} targetLocale Target locale name
   * @returns {string}
   */
  translate(duration: string, sourceLocale: string, targetLocale: string): string {
    const sourceDurationParser = new DurationParser(sourceLocale, this.#timeIdentifiers);
    const targetDurationParser = new DurationParser(targetLocale, this.#timeIdentifiers);
    const parsedSource = sourceDurationParser.parse(duration, 's');
    return targetDurationParser.compose(parsedSource, 's');
  }
}

export default DurationTranslator;