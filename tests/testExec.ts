import { strict } from 'assert';
import { RE2 } from '../scripts/re2';

export const testExec = (): void => {
  console.log('Testing re2 function: exec');

  console.log('test 1');
  const reExec1 = new RE2('(?i)quick\\s(brown).+?(jumps)', 'g');
  const resultExec1 = reExec1.exec(
    'The Quick Brown Fox Jumps Over The Lazy Dog'
  ) as string[][];
  strict.strictEqual(resultExec1[0][0], 'Quick Brown Fox Jumps');
  strict.strictEqual(resultExec1[0][1], 'Brown');
  strict.strictEqual(resultExec1[0][2], 'Jumps');
  console.log(resultExec1);

  console.log('test 2');
  const reExec2 = new RE2('(ab*)', 'g');
  const resultExec2 = reExec2.exec('abbcdefabh') as string[][];
  strict.strictEqual(resultExec2[0][0], 'abb');
  strict.strictEqual(resultExec2[0][1], 'abb');
  strict.strictEqual(resultExec2[1][0], 'ab');
  strict.strictEqual(resultExec2[1][1], 'ab');
  console.log(resultExec2);

  console.log('test 3');
  const reExec3 = new RE2('(hello \\S+)');
  const resultExec3 = reExec3.exec('This is a hello world!') as string[][];
  strict.strictEqual(resultExec3[0][0], 'hello world!');
  strict.strictEqual(resultExec3[0][1], 'hello world!');
  console.log(resultExec3);

  console.log('test 4');
  const reExec4 = new RE2('"DisplayName":"([^"]+).+?"RawIdentity":"(.+?)"');
  const resultExec4 = reExec4.exec(
    '{"identity":{"__type":"Identity:ECP","DisplayName":"taina_twelve","RawIdentity":"160ed57b-b1c-b160ed57b-b1c-bffa-d6ca6c113"}'
  ) as string[][];
  strict.strictEqual(
    resultExec4[0][0],
    '"DisplayName":"taina_twelve","RawIdentity":"160ed57b-b1c-b160ed57b-b1c-bffa-d6ca6c113"'
  );
  strict.strictEqual(resultExec4[0][1], 'taina_twelve');
  strict.strictEqual(
    resultExec4[0][2],
    '160ed57b-b1c-b160ed57b-b1c-bffa-d6ca6c113'
  );
  console.log(resultExec4);

  console.log('test 5');
  const reExec5 = new RE2('^(hello)', 'g');
  const resultExec5 = reExec5.exec('hellohello') as string[][];
  strict.strictEqual(resultExec5[0][0], 'hello');
  strict.strictEqual(resultExec5[0][1], 'hello');
  console.log(resultExec5);

  console.log('test 6');
  const reExec6 = new RE2('');
  const resultExec6 = reExec6.exec('something something') as string[][];
  strict.strictEqual(resultExec6[0][0].length, 0);
  console.log(resultExec6[0][0].length);

  console.log('test 7');
  const reExec7 = new RE2('(b|^a)', 'g');
  const resultExec7 = reExec7.exec('aabc') as string[][];
  strict.strictEqual(resultExec7[0][0], 'a');
  strict.strictEqual(resultExec7[0][1], 'a');
  strict.strictEqual(resultExec7[1][0], 'b');
  strict.strictEqual(resultExec7[1][1], 'b');
  console.log(resultExec7);

  console.log('test 8');
  const reExec8 = new RE2('(?:^a)', 'g');
  const resultExec8 = reExec8.exec('aabc') as string[][];
  strict.strictEqual(resultExec8[0][0], 'a');
  console.log(resultExec8);

  console.log('test 9');
  const reExec9 = new RE2('(?i)hunter\\s(wants).+?(where)');
  const resultExec9 = reExec9.exec(
    'Every Hunter Wants to Know Where the Pheasant Sits'
  ) as string[][];
  strict.strictEqual(resultExec9[0][0], 'Hunter Wants to Know Where');
  strict.strictEqual(resultExec9[0][1], 'Wants');
  strict.strictEqual(resultExec9[0][2], 'Where');
  console.log(resultExec9);

  console.log('test 10');
  const reExec10 = new RE2('');
  const resultExec10 = reExec10.exec(
    'asdfghjkl;zxcvbnm123456789'
  ) as string[][];
  strict.strictEqual(resultExec10[0][0], '');
  console.log(resultExec10);
  console.log();
};
