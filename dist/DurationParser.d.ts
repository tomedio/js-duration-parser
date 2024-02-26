import TimeIdentifiers from "./TimeIdentifiers";
declare class DurationParser {
    #private;
    /**
     * @param {string} locale Locale used for parsing duration
     * @param {TimeIdentifiers|null} customTimeIdentifiers Custom TimeIdentifiers object with added localized identifiers
     */
    constructor(locale?: string, customTimeIdentifiers?: TimeIdentifiers | null);
    /**
     * Return duration length from input expressed in target units
     *
     * @param {string} input Input duration string expressed in human-like pattern
     * @param {string} targetUnit Identifier of target time unit
     * @returns {number|null}
     */
    parse(input: string, targetUnit?: string): number | null;
    /**
     * Create duration string from time amount
     *
     * @param {number} time Input time amount expressed in source time unit
     * @param {string} sourceUnit Source time unit identifier
     * @param {string} groupSeparator Group separator used to join time groups in output duration string
     * @returns {string}
     */
    compose(time: number, sourceUnit?: string, groupSeparator?: string): string;
}
export default DurationParser;
