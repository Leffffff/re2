// import { execRegex, replaceString, testRegex } from './reFunctions';
// import { getPointers, validate } from './utils';

// const Module = require('../../re2Lib') as Module;

// export const init = (regex: string, flag = ''): moduleRe2 => {
//   validate(Module, regex);
//   return {
//     numberOfCaptureGroups: (): number => {
//       const [regexPointer] = getPointers(Module, regex);
//       return Module._getNumberOfCapturingGroups(regexPointer);
//     },

//     test: (text: string): boolean => testRegex(Module, text, regex),

//     exec: (text: string): string[][] => execRegex(Module, text, regex, flag),

//     replace: (baseText: string, rewrite: string): string =>
//       replaceString({
//         module: Module,
//         baseText,
//         regex,
//         rewrite,
//         flag: flag || '',
//       }),
//   };
// };
