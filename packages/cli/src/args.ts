export interface CliArgs {
  count: number;
  nationality?: string[];
  gender?: ('male' | 'female')[];
  ageGroup?: string[];
  avatarStyle?: 'realistic' | 'cartoon';
  includeAvatar: boolean;
  output?: string;
  format: 'json' | 'csv' | 'sql';
  dialect?: 'postgres' | 'mysql' | 'sqlite';
  seed?: string;
  help: boolean;
}

export function parseArgs(args: string[]): CliArgs {
  const result: CliArgs = {
    count: 1,
    includeAvatar: true,
    format: 'json',
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const next = args[i + 1];

    switch (arg) {
      case '-n':
      case '--count':
        result.count = parseInt(next, 10) || 1;
        i++;
        break;

      case '--nationality':
        result.nationality = next?.split(',');
        i++;
        break;

      case '--gender':
        result.gender = next?.split(',') as ('male' | 'female')[];
        i++;
        break;

      case '--age-group':
        result.ageGroup = next?.split(',');
        i++;
        break;

      case '--avatar':
        result.avatarStyle = next as 'realistic' | 'cartoon';
        i++;
        break;

      case '--no-avatar':
        result.includeAvatar = false;
        break;

      case '-o':
      case '--out':
        result.output = next;
        i++;
        break;

      case '-f':
      case '--format':
        result.format = next as 'json' | 'csv' | 'sql';
        i++;
        break;

      case '--dialect':
        result.dialect = next as 'postgres' | 'mysql' | 'sqlite';
        i++;
        break;

      case '--seed':
        result.seed = next;
        i++;
        break;

      case '-h':
      case '--help':
        result.help = true;
        break;
    }
  }

  // Infer format from output file extension
  if (result.output && !args.includes('-f') && !args.includes('--format')) {
    if (result.output.endsWith('.csv')) result.format = 'csv';
    else if (result.output.endsWith('.sql')) result.format = 'sql';
    else if (result.output.endsWith('.json')) result.format = 'json';
  }

  return result;
}

export function printHelp(): void {
  console.log(`
Personna CLI - Generate realistic user profiles

USAGE:
  personna [options]

OPTIONS:
  -n, --count <number>      Number of users to generate (default: 1)
  --nationality <codes>     Comma-separated nationality codes (e.g., SN,CI,FR)
  --gender <values>         Comma-separated genders (male,female)
  --age-group <values>      Comma-separated age groups (child,teen,young_adult,adult,senior)
  --avatar <style>          Avatar style: realistic or cartoon
  --no-avatar               Exclude avatars from output
  -o, --out <file>          Output file (stdout if not specified)
  -f, --format <format>     Output format: json, csv, sql (default: json)
  --dialect <dialect>       SQL dialect: postgres, mysql, sqlite (default: postgres)
  --seed <value>            Seed for reproducible output
  -h, --help                Show this help message

EXAMPLES:
  personna -n 10 --nationality SN,CI --format json
  personna -n 100 --gender male,female -o users.csv
  personna -n 50 --age-group adult,senior -o seed.sql --dialect postgres
  personna -n 5 --seed my-seed-123
`);
}
