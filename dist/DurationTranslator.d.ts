import TimeIdentifiers from "./TimeIdentifiers";
declare class DurationTranslator {
    #private;
    /**
     * @param {TimeIdentifiers} timeIdentifiers
     */
    constructor(timeIdentifiers?: TimeIdentifiers);
    /**
     * Translate duration string from source to target locale
     *
     * @param {string} duration Input duration string
     * @param {string} sourceLocale Source locale name
     * @param {string} targetLocale Target locale name
     * @returns {string}
     */
    translate(duration: string, sourceLocale: string, targetLocale: string): string;
}
export default DurationTranslator;
