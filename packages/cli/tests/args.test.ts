import { describe, it, expect } from 'vitest';
import { parseArgs } from '../src/args';

describe('parseArgs', () => {
  it('should parse count', () => {
    const args = parseArgs(['-n', '10']);
    expect(args.count).toBe(10);
  });

  it('should parse nationality', () => {
    const args = parseArgs(['--nationality', 'SN,CI,FR']);
    expect(args.nationality).toEqual(['SN', 'CI', 'FR']);
  });

  it('should parse gender', () => {
    const args = parseArgs(['--gender', 'male,female']);
    expect(args.gender).toEqual(['male', 'female']);
  });

  it('should parse output format', () => {
    const args = parseArgs(['-f', 'csv']);
    expect(args.format).toBe('csv');
  });

  it('should infer format from output file', () => {
    const args = parseArgs(['-o', 'users.csv']);
    expect(args.format).toBe('csv');
  });

  it('should parse seed', () => {
    const args = parseArgs(['--seed', 'my-seed']);
    expect(args.seed).toBe('my-seed');
  });

  it('should parse no-avatar flag', () => {
    const args = parseArgs(['--no-avatar']);
    expect(args.includeAvatar).toBe(false);
  });

  it('should handle help flag', () => {
    const args = parseArgs(['-h']);
    expect(args.help).toBe(true);
  });
});
