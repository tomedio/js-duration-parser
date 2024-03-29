import {TimeIdentifiersGroup} from "./TimeIdentifiers.types";

/**
 * Manage time identifiers used in duration string. This class allows to use time identifiers from many languages.
 */
class TimeIdentifiers {
  #identifiers = {
    en: {
      s: 's',
      m: 'm',
      h: 'h',
      d: 'd',
      w: 'w',
    },
  };

  /**
   * Register new time identifiers for the given locale
   *
   * @param {string} locale Name of locale for which time identifiers are registered
   * @param newIdentifiers New time identifiers
   * @returns {TimeIdentifiers}
   */
  add(locale: string, newIdentifiers): TimeIdentifiers {
    this.#identifiers[locale] = newIdentifiers;
    return this;
  }

  /**
   * Return time identifiers for the given locale name; if not registered, return identifiers for 'en' locale
   *
   * @param {string} locale Locale name
   * @returns {TimeIdentifiersGroup}
   */
  get(locale: string): TimeIdentifiersGroup {
    return this.#identifiers[locale] ?? this.#identifiers.en;
  }

  /**
   * Return internal unit (en) for the time unit in the specified locale
   *
   * @param {string} identifier Localized time identifier
   * @param {string} locale Locale name
   * @returns {string|null}
   */
  getInternalUnit(identifier: string, locale: string): string | null {
    const usedIdentifiers = this.get(locale);
    for (const originalIdentifier in usedIdentifiers) {
      if (usedIdentifiers[originalIdentifier] === identifier) {
        return originalIdentifier;
      }
    }
    return null;
  }
}

export default TimeIdentifiers;