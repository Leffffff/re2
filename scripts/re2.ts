import { execRegex, replaceString, testRegex } from './reFunctions';
import { freeUpMemory, getPointers, validate } from './utils';

const Module = require('../../bin/re2Lib') as Module;
export class RE2 {
  private regex: string;
  private flag?: string;

  constructor(regex: string, flag?: string) {
    validate(Module, regex);
    this.regex = regex;
    this.flag = flag;
  }

  /** @function numberOfCaptureGroups : returns number of capture groups. */
  numberOfCaptureGroups = (): number => {
    const [regexPointer] = getPointers(Module, this.regex);
    const number = Module._getNumberOfCapturingGroups(regexPointer);
    freeUpMemory(Module, regexPointer);
    return number;
  };

  /** @function _replace : returns boolean if regex matches string. */
  test = (text: string): boolean => testRegex(Module, text, this.regex);

  /** @function _replace : returns array of matched capture groups or empty array. */
  exec = (text: string): string[][] =>
    execRegex(Module, text, this.regex, this.flag);

  /** @function _replace : return new string with some or all matches of a pattern replaced by a replacement. */
  replace = (baseText: string, rewrite: string): string =>
    replaceString({
      module: Module,
      baseText,
      regex: this.regex,
      rewrite,
      flag: this.flag || '',
    });
}
