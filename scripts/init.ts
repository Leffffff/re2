import {
  execFunction,
  globalExec,
  replaceFunction,
  testFunction,
} from './reFunctions';
import { getPointers, validate } from './utils';
const RegExp2 = require('../../re2Lib');

// const Module = require('./test.js');
// const wasm = Module({ wasmBinaryFile: 'test.wasm' });
// wasm.onRuntimeInitialized = function() {
//   console.log(wasm._add(40, 40));
//   const mem = wasm._create(100, 100);
//   wasm._destroy(mem);
//   console.log('Done');
// };

export const init = (regex: string, flag = ''): RE2 => {
  // RegExp2['wasmBinary'] = readFileSync(resolve(__dirname, '../../re2Lib.wasm'));
  // const re2 = RegExp2({
  //   wasmBinaryFile: resolve(__dirname, '../../re2Lib.wasm'),
  // });
  // re2.onRuntimeInitialized = function() {
  //   // wasm._destroy(mem);
  //   console.log('Done');
  // };
  return RegExp2().then((re2: Module) => {
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
