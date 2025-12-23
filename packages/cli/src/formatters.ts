import type { GeneratedUser } from '@personna/core';

export function formatJson(users: GeneratedUser[]): string {
  return JSON.stringify(users, null, 2);
}

export function formatCsv(users: GeneratedUser[]): string {
  if (users.length === 0) return '';

  const headers = [
    'id', 'first_name', 'last_name', 'full_name', 'gender',
    'age', 'age_group', 'birth_date', 'nationality', 'ethnicity',
    'email', 'username', 'phone', 'street', 'city', 'country',
    'postal_code', 'locale', 'avatar_url',
  ];

  const rows = users.map((user) => [
    user.id,
    user.name.first,
    user.name.last,
    user.name.full,
    user.gender,
    user.age,
    user.ageGroup,
    user.birthDate.toISOString().split('T')[0],
    user.nationality,
    user.ethnicity,
    user.email,
    user.username,
    user.phone,
    user.address.street,
    user.address.city,
    user.address.country,
    user.address.postalCode ?? '',
    user.locale,
    user.avatar?.url ?? '',
  ]);

  const escape = (val: string | number) => {
    const str = String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  return [
    headers.join(','),
    ...rows.map((row) => row.map(escape).join(',')),
  ].join('\n');
}

export function formatSql(
  users: GeneratedUser[],
  dialect: 'postgres' | 'mysql' | 'sqlite' = 'postgres'
): string {
  if (users.length === 0) return '';

  const tableName = 'users';
  const columns = [
    'id', 'first_name', 'last_name', 'full_name', 'gender',
    'age', 'age_group', 'birth_date', 'nationality', 'ethnicity',
    'email', 'username', 'phone', 'street', 'city', 'country',
    'postal_code', 'locale', 'avatar_url',
  ];

  const escape = (val: string | number | null): string => {
    if (val === null) return 'NULL';
    if (typeof val === 'number') return String(val);
    return `'${String(val).replace(/'/g, "''")}'`;
  };

  const values = users.map((user) => {
    const row = [
      user.id,
      user.name.first,
      user.name.last,
      user.name.full,
      user.gender,
      user.age,
      user.ageGroup,
      user.birthDate.toISOString().split('T')[0],
      user.nationality,
      user.ethnicity,
      user.email,
      user.username,
      user.phone,
      user.address.street,
      user.address.city,
      user.address.country,
      user.address.postalCode ?? null,
      user.locale,
      user.avatar?.url ?? null,
    ];
    return `(${row.map(escape).join(', ')})`;
  });

  const insertPrefix = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES`;

  if (dialect === 'mysql') {
    // MySQL supports multi-row insert
    return `${insertPrefix}\n${values.join(',\n')};`;
  }

  // PostgreSQL and SQLite
  return `${insertPrefix}\n${values.join(',\n')};`;
}
