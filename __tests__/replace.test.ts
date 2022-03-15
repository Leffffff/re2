import { InitializeRe2 } from '../scripts/re2';

describe('Testing re2 function: replace', () => {
  let RE2: any;

  beforeEach(async () => {
    RE2 = await InitializeRe2();
  });

  test('Global and ignore-case in regex', () => {
    const re = new RE2('(?i)apples', 'g');
    const result = re.replace(
      'Apples are round, and apples are juicy.',
      'oranges'
    );
    expect(result).toBe('oranges are round, and oranges are juicy.');
  });
  test('Ignore-case', () => {
    const re = new RE2('(?i)xmas');
    const result = re.replace('Twas the night before Xmas...', 'Christmas');
    expect(result).toBe('Twas the night before Christmas...');
  });
  test('Rewrite groups', () => {
    const re = new RE2('(\\w+)\\s(\\w+)');
    const result = re.replace('John Smith', '\\2, \\1');
    expect(result).toBe('Smith, John');
  });
  test('Passing rewrite as function', () => {
    const re = new RE2('([^\\d]*)(\\d*)([^\\w]*)');
    const p1 = '\\1';
    const p2 = '\\2';
    const p3 = '\\3';
    const result = re.replace('abc12345#$*%', [p1, p2, p3].join(' - '));
    expect(result).toBe('abc - 12345 - #$*%');
  });
  test('Global replace', () => {
    const text =
      'yabba& dabba &doo yabba& dabba &doo yabba& dabba &doo yabba& dabba &doo yabba& dabba &doo';
    const re = new RE2('(\\w+?)&.+?&(\\w+)', 'g');
    const result = re.replace(text, '\\2 \\1');
    expect(result).toBe('doo yabba doo yabba doo yabba doo yabba doo yabba');
  });
});
