import { strict } from 'assert';
import { RE2 } from '../scripts/re2';

export const testCheck = (): void => {
  console.log('Testing re2 function: test');
  console.log('test 1');
  const reTest1 = new RE2('quick\\s(brown).+?(jumps)', 'g');
  const resultTest1 = reTest1.test(
    'The Quick Brown Fox Jumps Over The Lazy Dog'
  );
  strict.strictEqual(resultTest1, false);
  console.log(resultTest1);

  console.log('test 2');
  const reTest2 = new RE2('(?i)quick\\s(brown).+?(jumps)', 'g');
  const resultTest2 = reTest2.test(
    'The Quick Brown Fox Jumps Over The Lazy Dog'
  );
  strict.strictEqual(resultTest2, true);
  console.log(resultTest2);

  console.log('test 3');
  const reTest3 = new RE2('quick\\s(brown).+?(jumps)');
  const resultTest3 = reTest3.test(
    'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG'
  );
  strict.strictEqual(resultTest3, false);
  console.log(resultTest3);

  console.log('test 4');
  const reTest4 = new RE2('');
  const resultTest4 = reTest4.test('asdfghjkl;zxcvbnm1234567890');
  strict.strictEqual(resultTest4, true);
  console.log(resultTest4);

  console.log();
};
