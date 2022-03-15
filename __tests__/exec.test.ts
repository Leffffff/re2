import { InitializeRe2 } from '../scripts/re2';

describe('Testing re2 function: exec', () => {
  let RE2: any;

  beforeEach(async () => {
    RE2 = await InitializeRe2();
  });

  test('Simple check', () => {
    const re = new RE2('(?i)quick\\s(brown).+?(jumps)', 'g');
    const resultExec1 = re.exec(
      'The Quick Brown Fox Jumps Over The Lazy Dog'
    ) as string[][];
    expect(resultExec1[0][0]).toBe('Quick Brown Fox Jumps');
    expect(resultExec1[0][1]).toBe('Brown');
    expect(resultExec1[0][2]).toBe('Jumps');
  });
  test('With global', () => {
    const re = new RE2('(ab*)', 'g');
    const result = re.exec('abbcdefabh') as string[][];
    expect(result[0][0]).toBe('abb');
    expect(result[0][1]).toBe('abb');
    expect(result[1][0]).toBe('ab');
    expect(result[1][1]).toBe('ab');
  });
  test('(hello \\S+) with "This is a hello world!"', () => {
    const re = new RE2('(hello \\S+)');
    const result = re.exec('This is a hello world!') as string[][];
    expect(result[0][0]).toBe('hello world!');
    expect(result[0][1]).toBe('hello world!');
  });
  test('Check capture groups > 1', () => {
    const re = new RE2('"DisplayName":"([^"]+).+?"RawIdentity":"(.+?)"');
    const result = re.exec(
      '{"identity":{"__type":"Identity:ECP","DisplayName":"taina_twelve","RawIdentity":"160ed57b-b1c-b160ed57b-b1c-bffa-d6ca6c113"}'
    ) as string[][];
    expect(result[0][0]).toBe(
      '"DisplayName":"taina_twelve","RawIdentity":"160ed57b-b1c-b160ed57b-b1c-bffa-d6ca6c113"'
    );
    expect(result[0][1]).toBe('taina_twelve');
    expect(result[0][2]).toBe('160ed57b-b1c-b160ed57b-b1c-bffa-d6ca6c113');
  });
  test('Check global with ^', () => {
    const re = new RE2('^(hello)', 'g');
    const result = re.exec('hellohello') as string[][];
    expect(result[0][0]).toBe('hello');
    expect(result[0][1]).toBe('hello');
  });
  test('Empty regular expression', () => {
    const re = new RE2('');
    const result = re.exec('something something') as string[][];
    expect(result[0][0].length).toBe(0);
  });
  test('Caret in capture group with pipe (b|^a)', () => {
    const re = new RE2('(b|^a)', 'g');
    const result = re.exec('aabc') as string[][];
    expect(result[0][0]).toBe('a');
    expect(result[0][1]).toBe('a');
    expect(result[1][0]).toBe('b');
    expect(result[1][1]).toBe('b');
  });
  test('Caret with non-capture group (?:^a)', () => {
    const re = new RE2('(?:^a)', 'g');
    const result = re.exec('aabc') as string[][];
    expect(result[0][0]).toBe('a');
  });
  test('Check with ignore-case inside regular expression', () => {
    const re = new RE2('(?i)hunter\\s(wants).+?(where)');
    const result = re.exec(
      'Every Hunter Wants to Know Where the Pheasant Sits'
    ) as string[][];
    expect(result[0][0]).toBe('Hunter Wants to Know Where');
    expect(result[0][1]).toBe('Wants');
    expect(result[0][2]).toBe('Where');
  });
});
