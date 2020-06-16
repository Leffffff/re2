import { exec, globalExec, replace, test } from './reFunctions';
import { getPointers, validation } from './utils';
const RegExp2 = require('../../re2Lib');

const RE2 = async (regex: string, flag?: string): Promise<RE2> => {
  return await RegExp2().then((re2: Module) => {
    validation(re2, regex);
    return {
      numberOfCaptureGroups: (): number => {
        const [regexPointer] = getPointers(re2, regex);
        return re2._getNumberOfCapturingGroups(regexPointer);
      },

      test: (text: string): boolean => test(re2, text, regex),

      exec: (text: string): string[] | string[][] | null =>
        flag === 'g' ? globalExec(re2, text, regex) : exec(re2, text, regex),

      replace: (baseText: string, rewrite: string): string =>
        replace({
          module: re2,
          baseText,
          regex,
          rewrite,
          flag: flag || '',
        }),
    };
  });
};

export default RE2;
