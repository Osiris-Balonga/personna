import type { Gender } from '../types';

/**
 * Fallback names when no external name package is installed
 * Provides international names that work for any nationality
 */
export const FALLBACK_FIRST_NAMES: Record<Gender, string[]> = {
  male: [
    'Adam', 'Ali', 'Carlos', 'David', 'Emmanuel',
    'Felix', 'Gabriel', 'Hassan', 'Ibrahim', 'James',
    'Kevin', 'Leo', 'Marcus', 'Nathan', 'Omar',
    'Patrick', 'Rafael', 'Samuel', 'Thomas', 'Victor',
    'William', 'Xavier', 'Yusuf', 'Zachary',
  ],
  female: [
    'Amara', 'Bella', 'Camila', 'Diana', 'Elena',
    'Fatima', 'Grace', 'Hannah', 'Isabella', 'Julia',
    'Karima', 'Leila', 'Maria', 'Nadia', 'Olivia',
    'Priya', 'Rachel', 'Sofia', 'Tanya', 'Uma',
    'Valentina', 'Wendy', 'Xena', 'Yara', 'Zara',
  ],
};

export const FALLBACK_LAST_NAMES: string[] = [
  'Adams', 'Ahmed', 'Ali', 'Anderson', 'Brown',
  'Chen', 'Clark', 'Davis', 'Diallo', 'Garcia',
  'Harris', 'Jackson', 'Johnson', 'Jones', 'Kim',
  'Lee', 'Martin', 'Miller', 'Moore', 'Nguyen',
  'Patel', 'Rodriguez', 'Santos', 'Singh', 'Smith',
  'Taylor', 'Thomas', 'Thompson', 'Williams', 'Wilson',
];
