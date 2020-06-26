import { strict } from 'assert';
import { RE2 } from '../scripts/re2';
((): void => {
  //test 1
  const reTest1 = new RE2('quick\\s(brown).+?(jumps)', 'g');
  const resultReplace1 = reTest1.test(
    'The Quick Brown Fox Jumps Over The Lazy Dog'
  );
  strict.equal(resultReplace1, false);

  //test 2
  const reTest2 = new RE2('(?i)quick\\s(brown).+?(jumps)', 'g');
  const resultReplace2 = reTest2.test(
    'The Quick Brown Fox Jumps Over The Lazy Dog'
  );
  strict.equal(resultReplace2, true);

  //test 4
  const reTest4 = new RE2('quick\\s(brown).+?(jumps)');
  const resultReplace4 = reTest4.test(
    'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG'
  );
  strict.equal(resultReplace4, false);
})();
