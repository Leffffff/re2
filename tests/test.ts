import * as chalk from 'chalk';
import { testCheck } from './testCheck';
import { testExec } from './testExec';
import { testReplace } from './testReplace';

((): void => {
  testCheck();
  testExec();
  testReplace();
  console.log(chalk.green('All tests passed!'));
})();
