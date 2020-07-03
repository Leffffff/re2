import { resolve } from 'path';
import { execRegex, replaceString, testRegex } from './reFunctions';
import { errorHandler, freeUpMemory, getPointers, validate } from './utils';

const modulePath = resolve(process.cwd() + '/bin/re2Lib');
const re2Module = require(modulePath) as RegExp2;
export class RE2 {
  private regex: string;
  private flag?: string;

  constructor(regex: string, flag?: string) {
    errorHandler(regex, 'Regular expression can not be');

    validate(re2Module, regex);
    this.regex = regex;
    this.flag = flag;
  }

  /** @function numberOfCaptureGroups : returns number of capture groups. */
  numberOfCaptureGroups = (): number => {
    const [regexPointer] = getPointers(re2Module, this.regex);
    const number = re2Module._getQtyOfCapturingGroups(regexPointer);
    freeUpMemory(re2Module, regexPointer);
    return number;
  };

  /** @function _replace : returns boolean if regex matches string. */
  test = (text: string): boolean => testRegex(re2Module, text, this.regex);

  /** @function _replace : returns array of fullmatch and matched capture groups or null. Works like RegExp matchAll */
  exec = (text: string): string[][] | null =>
    execRegex(re2Module, text, this.regex, this.flag);

  /** @function _replace : return new string with some or all matches of a pattern replaced by a replacement. */
  replace = (baseText: string, rewrite: string): string =>
    replaceString({
      re2: re2Module,
      baseText,
      regex: this.regex,
      rewrite,
      flag: this.flag || '',
    });

  /** @static @function validate : re2 validation over regex */
  static validate = (regex: string): string => {
    const [regexPointer] = getPointers(re2Module, regex);
    const statusPointer = re2Module._validate(regexPointer);

    freeUpMemory(re2Module, regexPointer, statusPointer);
    return statusPointer === 0
      ? 'ok'
      : `Error in '${regex}': ${re2Module.UTF8ToString(statusPointer)}`;
  };
}
