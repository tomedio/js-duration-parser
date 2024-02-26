/**
 * Allow time conversion between units
 */
class TimeConverter {
  #conversionMatrix = {
    's=>s': 1,
    'm=>s': 60,
    'h=>s': 60 * 60,
    'd=>s': 24 * 60 * 60,
    'w=>s': 7 * 24 * 60 * 60,
    's=>m': 1 / 60,
    'm=>m': 1,
    'h=>m': 60,
    'd=>m': 24 * 60,
    'w=>m': 7 * 24 * 60,
    's=>h': 1 / 60 / 60,
    'm=>h': 1 / 60,
    'h=>h': 1,
    'd=>h': 24,
    'w=>h': 7 * 24,
    's=>d': 1 / 24 / 60 / 60,
    'm=>d': 1 / 24 / 60,
    'h=>d': 1 / 24,
    'd=>d': 1,
    'w=>d': 7,
    's=>w': 1 / 7 / 24 / 60 / 60,
    'm=>w': 1 / 7 / 24 / 60,
    'h=>w': 1 / 7 / 24,
    'd=>w': 1 / 7,
    'w=>w': 1,
  };

  /**
   * Convert time number expressed in source unit to number expressed in target unit; both units are basic one (en)
   *
   * @param {number} time Input time number
   * @param {string} sourceUnit Source time unit
   * @param {string} targetUnit Target time unit
   * @returns {number}
   */
  convert(time: number, sourceUnit: string, targetUnit: string): number {
    const conversion = `${sourceUnit}=>${targetUnit}`;
    const factor = this.#conversionMatrix[conversion] ?? null;
    if (factor === null) {
      throw new Error(`Conversion ${conversion} is not supported!`);
    }
    return time * factor;
  }
}

export default TimeConverter;