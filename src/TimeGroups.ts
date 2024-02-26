import TimeIdentifiers from "./TimeIdentifiers";
import {TimeGroup} from "./TimeGroups.types";

/**
 * Manage time groups and make some operations on them.
 */
class TimeGroups {
  #timeIdentifiers;

  /* istanbul ignore next */
  /**
   * @param {TimeIdentifiers|null} timeIdentifiers
   */
  constructor(timeIdentifiers: TimeIdentifiers|null = null) {
    this.#timeIdentifiers = timeIdentifiers ?? new TimeIdentifiers();
  }

  /**
   * Extract array of time groups which are in duration string
   *
   * @param {string} duration Whole duration string
   * @param {string} locale Locale name of time identifiers used in duration string
   * @returns {string[]}
   */
  extractTimeGroups(duration: string, locale: string): string[] {
    const usedIdentifiers = this.#timeIdentifiers.get(locale);
    const stringRegex = `^(\\d+${usedIdentifiers.w})?\\s*(\\d+${usedIdentifiers.d})?\\s*(\\d+${usedIdentifiers.h})?\\s*(\\d+${usedIdentifiers.m})?\\s*(\\d+${usedIdentifiers.s})?$`;
    const regex = new RegExp(stringRegex);
    const result = duration.trim().toLowerCase().match(regex);
    if (result === null) {
      return [];
    }
    return [...result].slice(1).filter(Boolean);
  }

  /**
   * Parse single time group to object having information about both unit and number of it
   *
   * @param {string} timeGroup Single time group
   * @param {string} locale Locale name of time unit used in time group
   * @returns {TimeGroup|null}
   */
  parseTimeGroup(timeGroup: string, locale: string): TimeGroup|null {
    const usedIdentifiers = this.#timeIdentifiers.get(locale);
    const stringRegex = `^(\\d+)\\s*([${usedIdentifiers.w}${usedIdentifiers.d}${usedIdentifiers.h}${usedIdentifiers.m}${usedIdentifiers.s}])$`;
    const regex = new RegExp(stringRegex);
    const result = timeGroup.trim().toLowerCase().match(regex);
    if (result === null) {
      return null;
    }
    const timeParts = [...result].slice(1);
    return {
      time: parseInt(timeParts[0]),
      unit: timeParts[1]
    };
  }

  /**
   * Build a single time group from object created while parsing a group
   *
   * @param {TimeGroup} parsedTime Object of parsed time group
   * @returns {string}
   */
  buildTimeGroup(parsedTime: TimeGroup): string {
    if (typeof parsedTime.time === 'undefined' || typeof parsedTime.unit === 'undefined') {
      throw new Error('Wrong input object is passed');
    }
    return `${parsedTime.time}${parsedTime.unit.trim()}`
  }

  /**
   * Compose the whole duration string from array of time groups; given separator is used to join all groups
   *
   * @param {string[]} timeGroups Array of time groups in the same locale as for output
   * @param {string} groupSeparator Separator between every group in output duration string
   * @returns {string}
   */
  composeDuration(timeGroups: string[], groupSeparator: string = ' '): string {
    return timeGroups.join(groupSeparator);
  }
}

export default TimeGroups;