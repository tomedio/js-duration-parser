/**
 * Allow time conversion between units
 */
declare class TimeConverter {
    #private;
    /**
     * Convert time number expressed in source unit to number expressed in target unit; both units are basic one (en)
     *
     * @param {number} time Input time number
     * @param {string} sourceUnit Source time unit
     * @param {string} targetUnit Target time unit
     * @returns {number}
     */
    convert(time: number, sourceUnit: string, targetUnit: string): number;
}
export default TimeConverter;
