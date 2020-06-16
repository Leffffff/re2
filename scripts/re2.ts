import { exec, globalExec, replace, test } from './reFunctions';
import { getPointers, validation } from './utils';
const RegExp2 = require('../../re2Lib');

const validate = async (regex: string): Promise<void> => {
  await RegExp2().then((re2: Module) => {
    validation(re2, regex);
  });
};

const RE2 = async (regex: string, flag?: string): Promise<RE2> => {
  await validate(regex);

  return {
    numberOfCaptureGroups: async (): Promise<void> =>
      await RegExp2().then((re2: Module) => {
        const [regexPointer] = getPointers(re2, regex);
        return re2._getNumberOfCapturingGroups(regexPointer);
      }),

    test: async (text): Promise<boolean> =>
      await RegExp2().then((re2: Module) => test(re2, text, regex)),

    exec: async (text): Promise<string[] | string[][]> =>
      await RegExp2().then((re2: Module) =>
        flag === 'g' ? globalExec(re2, text, regex) : exec(re2, text, regex)
      ),
  };
};

RE2.replace = async (
  baseText: string,
  regex: string,
  rewrite: string,
  flag?: string
): Promise<string> =>
  await RegExp2().then(async (module: Module) => {
    await validate(regex);

    return replace({ module, baseText, regex, rewrite, flag: flag || '' });
  });

export default RE2;
