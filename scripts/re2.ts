import { execRegex, replaceString, testRegex } from './reFunctions';
import { freeUpMemory, getPointers, validate } from './utils';

const re2Module = require('../../bin/re2Lib') as RegExp2;
export class RE2 {
  private regex: string;
  private flag?: string;

  constructor(regex: string, flag?: string) {
    // just like RegExp
    if (regex === null) {
      this.regex = `${regex}`;
      return this;
    }
    if (regex === undefined || regex.length === 0) {
      this.regex = '(?:)';
      return this;
    }
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

  /** @function _replace : returns array of matched capture groups or empty array. Works like RegExp matchAll */
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
}
