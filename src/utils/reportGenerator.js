import { employees } from '../data/employees.js';

export function generateAttendanceReport(data = {}, date) {
  const categories = [
    { key: 'Present in office', emoji: '🏢' },
    { key: 'Present in yard', emoji: '⚓' },
    { key: 'Late arrival', emoji: '🏃' },
    { key: 'On leave', emoji: '🙋' },
    { key: 'Sick leave', emoji: '😷' },
    { key: 'Half day leave', emoji: '🕒' },
  ];

  const lines = [];
  lines.push('Good Morning, Sir.');
  lines.push('');
  lines.push(`Date: ${date}`);
  lines.push('');
  lines.push('📋 Today\'s Attendance Report');
  lines.push('');

  categories.forEach((category) => {
    const names = Object.entries(data)
      .filter(([, info]) => info.status === category.key)
      .map(([name]) => name)
      .sort((a, b) => a.localeCompare(b));

    lines.push(`${category.emoji} ${category.key} - ${names.length}`);
    if (names.length > 0) {
      names.forEach((name) => lines.push(name));
    }
    lines.push('');
  });

  const submittedNames = new Set(
    Object.keys(data)
      .filter((name) => typeof name === 'string' && name.trim())
  );
  const notSubmitted = employees
    .filter((employee) => !submittedNames.has(employee))
    .sort((a, b) => a.localeCompare(b));

  lines.push('--------------------------------');
  lines.push('');
  lines.push(`⚠️ Attendance Not Submitted - ${notSubmitted.length}`);
  lines.push('');
  if (notSubmitted.length > 0) {
    notSubmitted.forEach((name) => lines.push(name));
    lines.push('');
  }
  lines.push('--------------------------------');

  return lines.join('\n').trim();
}
