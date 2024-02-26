import TimeIdentifiers from "./TimeIdentifiers";
import { TimeGroup } from "./TimeGroups.types";
/**
 * Manage time groups and make some operations on them.
 */
declare class TimeGroups {
    #private;
    /**
     * @param {TimeIdentifiers|null} timeIdentifiers
     */
    constructor(timeIdentifiers?: TimeIdentifiers | null);
    /**
     * Extract array of time groups which are in duration string
     *
     * @param {string} duration Whole duration string
     * @param {string} locale Locale name of time identifiers used in duration string
     * @returns {string[]}
     */
    extractTimeGroups(duration: string, locale: string): string[];
    /**
     * Parse single time group to object having information about both unit and number of it
     *
     * @param {string} timeGroup Single time group
     * @param {string} locale Locale name of time unit used in time group
     * @returns {TimeGroup|null}
     */
    parseTimeGroup(timeGroup: string, locale: string): TimeGroup | null;
    /**
     * Build a single time group from object created while parsing a group
     *
     * @param {TimeGroup} parsedTime Object of parsed time group
     * @returns {string}
     */
    buildTimeGroup(parsedTime: TimeGroup): string;
    /**
     * Compose the whole duration string from array of time groups; given separator is used to join all groups
     *
     * @param {string[]} timeGroups Array of time groups in the same locale as for output
     * @param {string} groupSeparator Separator between every group in output duration string
     * @returns {string}
     */
    composeDuration(timeGroups: string[], groupSeparator?: string): string;
}
export default TimeGroups;
