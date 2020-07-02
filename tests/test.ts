import { testCheck } from './testCheck';
import { testExec } from './testExec';
import { testReplace } from './testReplace';

((): void => {
  testCheck();
  testExec();
  testReplace();
  console.log('All tests passed!');
})();
