import { writeFileSync } from 'node:fs';
import { Personna } from '@personna/core';
import type { CreateUserOptions, AgeGroup } from '@personna/core';
import { parseArgs, printHelp } from './args';
import { formatJson, formatCsv, formatSql } from './formatters';

function main(): void {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  // Build options
  const options: CreateUserOptions = {
    includeAvatar: args.includeAvatar,
  };

  if (args.nationality) {
    options.nationality = args.nationality.length === 1
      ? args.nationality[0]
      : args.nationality;
  }

  if (args.gender) {
    options.gender = args.gender.length === 1
      ? args.gender[0]
      : args.gender;
  }

  if (args.ageGroup) {
    options.ageGroup = (args.ageGroup.length === 1
      ? args.ageGroup[0]
      : args.ageGroup) as AgeGroup | AgeGroup[];
  }

  if (args.avatarStyle) {
    options.avatarStyle = args.avatarStyle;
  }

  if (args.seed) {
    options.seed = args.seed;
  }

  // Generate users
  const users = Personna.createMany(args.count, options);

  // Format output
  let output: string;
  switch (args.format) {
    case 'csv':
      output = formatCsv(users);
      break;
    case 'sql':
      output = formatSql(users, args.dialect ?? 'postgres');
      break;
    default:
      output = formatJson(users);
  }

  // Write output
  if (args.output) {
    writeFileSync(args.output, output, 'utf-8');
    console.log(`Generated ${users.length} users to ${args.output}`);
  } else {
    console.log(output);
  }
}

main();
