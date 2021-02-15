import { re2Functions } from './reFunctions';
import { freeUpMemory, getPointers, validate } from './utils';

const re2Module = require('../../bin/re2Lib') as RegExp2;
export class RE2 {
  private regex: string;
  private re2: RE2Functions;

  /**
   * @param regex can not be undefined or null
   */
  constructor(regex: string, flag = '') {
    validate(re2Module, regex);
    this.regex = regex;
    this.re2 = re2Functions(re2Module, regex, flag);
  }

  /** Returns number of capture groups. */
  numberOfCaptureGroups = (): number => {
    const [regexPointer] = getPointers(re2Module, this.regex);
    const number = re2Module._getQtyOfCapturingGroups(regexPointer);
    freeUpMemory(re2Module, regexPointer);
    return number;
  };

  /** Executes a search for a match between a regular expression and a specified string.
   * Returns true or false.
   * @param string Can be only a string
   */
  test = (string: string): boolean => this.re2.testRegex(string);

  /** Returns all matches of the regular expression against a string.
   * @param string Can be only a string
   */
  exec = (string: string): string[][] | null => this.re2.execRegex(string);

  /** Return new string with some or all matches of a pattern replaced by a replacement.
   * @param string Can be only a string
   * @param rewrite Can be only a string
   */
  replace = (string: string, rewrite: string): string =>
    this.re2.replaceString({ string, rewrite });
}
