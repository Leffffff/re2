import { getRE2Class } from '../scripts/re2';

describe('Testing re2 function: test', () => {
  let RE2: any;

  beforeEach(async () => {
    RE2 = await getRE2Class();
  });

  test('Simple test', async () => {
    const re = new RE2('quick\\s(brown).+?(jumps)', 'g');
    const result = re.test('The Quick Brown Fox Jumps Over The Lazy Dog');
    expect(result).toBeFalsy();
  });
  test('Test with ignore case', () => {
    const re = new RE2('(?i)quick\\s(brown).+?(jumps)', 'g');
    const result = re.test('The Quick Brown Fox Jumps Over The Lazy Dog');
    expect(result).toBeTruthy();
  });
  test('Test with caps', () => {
    const re = new RE2('quick\\s(brown).+?(jumps)');
    const result = re.test('THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG');
    expect(result).toBeFalsy();
  });
  test('Test with empty regular expression', () => {
    const re = new RE2('');
    const result = re.test('asdfghjkl;zxcvbnm1234567890');
    expect(result).toBeTruthy();
  });
});
