import TimeGroups from "./TimeGroups";
import TimeIdentifiers from "./TimeIdentifiers";

/**
 * Validate duration string without doing a conversion
 */
class DurationValidator {
  #timeGroups;

  /**
   * @param {TimeIdentifiers|null} timeIdentifiers
   */
  constructor(timeIdentifiers: TimeIdentifiers|null = null) {
    this.#timeGroups = new TimeGroups(timeIdentifiers ?? new TimeIdentifiers());
  }

  /**
   *  Validate if duration string meets all syntactic requirements
   *
   * @param {string} duration Duration string expressed in human-like format
   * @param {string} locale Locale name which is used in duration string
   * @returns {boolean}
   */
  validate(duration: string, locale: string = 'en'): boolean {
    return Boolean(
        duration.length > 0 && (duration.trim().match(/^\d+$/) !== null || this.#timeGroups.extractTimeGroups(duration, locale).length)
    );
  }
}

export default DurationValidator;