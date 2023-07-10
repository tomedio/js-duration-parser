import DurationParser from "./DurationParser";
import TimeIdentifiers from "./TimeIdentifiers";

class DurationTranslator {
  #timeIdentifiers;

  /* istanbul ignore next */
  /**
   * @param {TimeIdentifiers|null} timeIdentifiers
   */
  constructor(timeIdentifiers = new TimeIdentifiers()) {
    this.#timeIdentifiers = timeIdentifiers;
  }

  /**
   * Translate duration string from source to target locale
   *
   * @param duration Input duration string
   * @param sourceLocale Source locale name
   * @param targetLocale Target locale name
   * @returns {string|null}
   */
  translate(duration, sourceLocale, targetLocale) {
    const sourceDurationParser = new DurationParser(sourceLocale, this.#timeIdentifiers);
    const targetDurationParser = new DurationParser(targetLocale, this.#timeIdentifiers);
    const parsedSource = sourceDurationParser.parse(duration, 's');
    return targetDurationParser.compose(parsedSource, 's');
  }
}

export default DurationTranslator;