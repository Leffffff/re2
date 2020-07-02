import { strict } from 'assert';
import { RE2 } from '../scripts/re2';
((): void => {
  console.log("test 1")
  const reTest1 = new RE2('quick\\s(brown).+?(jumps)', 'g');
  const resultTest1 = reTest1.test(
    'The Quick Brown Fox Jumps Over The Lazy Dog'
  );
  strict.equal(resultTest1, false);
  console.log(resultTest1);

  console.log("test 2")
  const reTest2 = new RE2('(?i)quick\\s(brown).+?(jumps)', 'g');
  const resultTest2 = reTest2.test(
    'The Quick Brown Fox Jumps Over The Lazy Dog'
  );
  strict.equal(resultTest2, true);
  console.log(resultTest2);

  console.log("test 3")
  const reTest3 = new RE2('quick\\s(brown).+?(jumps)');
  const resultTest3 = reTest3.test(
    'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG'
  );
  strict.equal(resultTest3, false);
  console.log(resultTest3);
  
  console.log("test 4")
  const reTest4 = new RE2(undefined as unknown as string) ;
  const resultTest4 = reTest4.test(
    'Every Hunter Wants to Know Where the Pheasant Sits'
  );
  strict.equal(resultTest4, true);
  console.log(resultTest4);
  
  console.log("test 5")
  const reTest5 = new RE2('(?i)hunter\\swants.+?where') ;
  const resultTest5 = reTest5.test(undefined as unknown as string);
  strict.equal(resultTest5, false);
  console.log(resultTest5);

  console.log("test 6")
  const reTest6 = new RE2(undefined as unknown as string) ;
  const resultTest6 = reTest6.test(undefined as unknown as string);
  strict.equal(resultTest6, true);
  console.log(resultTest6);
  1
  console.log("test 7")
  const reTest7 = new RE2('') ;
  const resultTest7 = reTest7.test('asdfghjkl;zxcvbnm1234567890');
  strict.equal(resultTest7, true);
  console.log(resultTest7);
})();
