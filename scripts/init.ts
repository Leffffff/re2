import {
  execFunction,
  globalExec,
  replaceFunction,
  testFunction,
} from './reFunctions';
import { getPointers, validate } from './utils';
const RegExp2 = require('../../re2Lib');

export const init = async (regex: string, flag = ''): Promise<RE2> => {
  return await RegExp2().then((re2: Module) => {
    validate(re2, regex);
    return {
      numberOfCaptureGroups: (): number => {
        const [regexPointer] = getPointers(re2, regex);
        return re2._getNumberOfCapturingGroups(regexPointer);
      },

      test: (text: string): boolean => testFunction(re2, text, regex),

      exec: (
        text: string
      ): string[] | string[][] | null => // make proper return value API
        flag === 'g'
          ? globalExec(re2, text, regex)
          : execFunction(re2, text, regex),

      replace: (baseText: string, rewrite: string): string =>
        replaceFunction({
          module: re2,
          baseText,
          regex,
          rewrite,
          flag,
        }),
    };
  });
};
