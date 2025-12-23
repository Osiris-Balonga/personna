import type { OptionValue, WeightedOption } from '../types';
import type { SeededRandom } from '../random';

export class DistributionResolver {
  constructor(private random: SeededRandom) {}

  /**
   * Resolve an option value to a single value
   * Handles: single value | array | weighted array
   */
  resolve<T>(option: OptionValue<T> | undefined, defaultValue: T): T {
    // Undefined: use default
    if (option === undefined) {
      return defaultValue;
    }

    // Single value: return as-is
    if (!Array.isArray(option)) {
      return option;
    }

    // Empty array: use default
    if (option.length === 0) {
      return defaultValue;
    }

    // Weighted array: use weighted pick
    if (this.isWeightedArray(option)) {
      return this.random.weightedPick(option);
    }

    // Simple array: uniform distribution
    return this.random.pick(option);
  }

  /**
   * Check if array is weighted (has { value, weight } objects)
   */
  private isWeightedArray<T>(arr: T[] | WeightedOption<T>[]): arr is WeightedOption<T>[] {
    if (arr.length === 0) return false;
    const first = arr[0];
    return (
      typeof first === 'object' &&
      first !== null &&
      'value' in first &&
      'weight' in first
    );
  }

  /**
   * Resolve multiple values at once (utility method)
   */
  resolveAll<T extends Record<string, unknown>>(
    options: Partial<{ [K in keyof T]: OptionValue<T[K]> }>,
    defaults: T
  ): T {
    const result = { ...defaults };

    for (const key of Object.keys(defaults) as Array<keyof T>) {
      const option = options[key];
      if (option !== undefined) {
        result[key] = this.resolve(option as OptionValue<T[keyof T]>, defaults[key]);
      }
    }

    return result;
  }
}
