import type { CreateUserOptions, GeneratedUser, FactoryConfig } from '../types';
import { DEFAULT_CONFIG } from '../types';
import { SeededRandom } from '../random';
import { UserGenerator } from '../generators';

/**
 * Main Personna factory class
 * Provides the public API for generating users
 */
export class Personna {
  private static config: FactoryConfig = { ...DEFAULT_CONFIG };
  private static callCounter = 0;

  /**
   * Configure global settings
   */
  static configure(config: Partial<FactoryConfig>): void {
    Personna.config = { ...Personna.config, ...config };
  }

  /**
   * Reset configuration to defaults
   */
  static resetConfig(): void {
    Personna.config = { ...DEFAULT_CONFIG };
  }

  /**
   * Get current configuration
   */
  static getConfig(): FactoryConfig {
    return { ...Personna.config };
  }

  /**
   * Create a single user
   */
  static create(options: CreateUserOptions = {}): GeneratedUser {
    const seed = options.seed ?? `${Date.now()}-${++Personna.callCounter}-${Math.random()}`;
    const random = new SeededRandom(seed);
    const generator = new UserGenerator(random, Personna.config);

    return generator.generate(options);
  }

  /**
   * Create multiple users
   */
  static createMany(count: number, options: CreateUserOptions = {}): GeneratedUser[] {
    if (count < 1) {
      return [];
    }

    const baseSeed = options.seed ?? `${Date.now()}-${++Personna.callCounter}-${Math.random()}`;
    const users: GeneratedUser[] = [];

    for (let i = 0; i < count; i++) {
      // Create unique seed for each user while maintaining determinism
      const userSeed = `${baseSeed}-${i}`;
      const random = new SeededRandom(userSeed);
      const generator = new UserGenerator(random, Personna.config);
      users.push(generator.generate(options));
    }

    return users;
  }
}
