import TimeIdentifiers from "./TimeIdentifiers";
/**
 * Validate duration string without doing a conversion
 */
declare class DurationValidator {
    #private;
    /**
     * @param {TimeIdentifiers|null} timeIdentifiers
     */
    constructor(timeIdentifiers?: TimeIdentifiers | null);
    /**
     *  Validate if duration string meets all syntactic requirements
     *
     * @param {string} duration Duration string expressed in human-like format
     * @param {string} locale Locale name which is used in duration string
     * @returns {boolean}
     */
    validate(duration: string, locale?: string): any;
}
export default DurationValidator;
