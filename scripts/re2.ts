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
    // await validate(rewrite); // check \1 and $1

    return replace({ module, baseText, regex, rewrite, flag: flag || '' });
  });

export default RE2;

// export class RE2 {
//   private regex!: string;

//   constructor(regex: string) {
//     new Promise(async resolve => {
//       await validate(regex);
//       this.regex = regex;
//       resolve(this);
//     });
//   }

//   numberOfCaptureGroups = async (): Promise<void> =>
//     await RegExp2().then((re2: Module) => {
//       const [regexPointer] = getPointers(re2, this.regex);
//       return re2._getNumberOfCapturingGroups(regexPointer);
//     });

//   match = async (text: string, flag?: string): Promise<string[] | string[][]> =>
//     await RegExp2().then(async (re2: Module) => {
//       console.log(this.regex);
//       if (flag === 'g') {
//         const gArr = await this.globalMatch(re2, text);
//         console.log(gArr && gArr.length);
//         return gArr;
//       }
//       const [textPointer, regexPointer] = getPointers(re2, text, this.regex);

//       const captureGroups = re2._getNumberOfCapturingGroups(regexPointer);
//       if (captureGroups < 0) throw Error('Error with groups');

//       if (captureGroups === 0) {
//         console.log("Regex doesn't have capture group(s)");
//         return null;
//       }

//       const arrayPtr = re2._getCapturingGroups(textPointer, regexPointer);

//       if (arrayPtr === 0) return null; // no matched string

//       const arr: string[] = [];
//       for (let i = 0; i < captureGroups; ++i) {
//         const stringPtr = re2._getStringPtrByIndex(arrayPtr, i);
//         const string = re2.UTF8ToString(stringPtr);
//         freeUpMemory(re2, stringPtr);
//         arr.push(string);
//       }

//       freeUpMemory(re2, textPointer, regexPointer, arrayPtr);
//       return arr;
//     });

//   private globalMatch = (module: Module, text: string): string[][] | null => {
//     const [regexPointer] = getPointers(module, this.regex);

//     const captureGroups = module._getNumberOfCapturingGroups(regexPointer);
//     if (captureGroups < 0) throw Error('Error with groups');

//     const re = /(.+?)(\(.+?\))(.+?)(\(.+?\)+)/;
//     const groups = re.exec(this.regex);
//     console.log('INFO: RE2 -> //qwe -> groups', groups);

//     let [textPointer] = getPointers(module, text);
//     const rejs = new RegExp(this.regex);
//     const gArr = [];

//     while (rejs.test(text)) {
//       textPointer = getPointers(module, text)[0];
//       if (captureGroups === 0) {
//         console.log("Regex doesn't have capture group(s)");
//         return null;
//       }

//       const arrayPtr = module._getCapturingGroups(textPointer, regexPointer);

//       if (arrayPtr === 0) return null; // no matched string

//       const arr: string[] = [];
//       for (let i = 0; i < captureGroups; ++i) {
//         const stringPtr = module._getStringPtrByIndex(arrayPtr, i);
//         const string = module.UTF8ToString(stringPtr);
//         freeUpMemory(module, stringPtr);
//         arr.push(string);
//       }
//       gArr.push(arr);
//       const str = new RegExp(groups![1] + arr[0] + groups![3] + arr[1]).exec(
//         text
//       )![0];
//       const pos = text.indexOf(str);
//       text = text.slice(pos + str.length);
//     }
//     freeUpMemory(module, regexPointer, textPointer);
//     return gArr;
//   };

//   exec = async (text: string): Promise<string> =>
//     await RegExp2().then((re2: Module) => {
//       const [textPointer, regexPointer] = getPointers(re2, text, this.regex);

//       const matchedPointer = re2._singleMatch(textPointer, regexPointer);
//       const matchedString =
//         matchedPointer !== 0 ? re2.UTF8ToString(matchedPointer) : null;

//       freeUpMemory(re2, textPointer, regexPointer, matchedPointer);
//       return matchedString;
//     });

//   static replace = async (
//     baseText: string,
//     regex: string,
//     rewrite: string,
//     flag?: string
//   ): Promise<string> =>
//     await RegExp2().then(async (re2: Module) => {
//       await validate(regex);
//       const [
//         textPointer,
//         regexPointer,
//         flagPointer,
//         rewritePointer,
//       ] = getPointers(re2, baseText, regex, flag || '', rewrite);

//       const replacedStringPointer = re2._replace(
//         textPointer,
//         regexPointer,
//         rewritePointer,
//         flagPointer
//       );
//       const replacedString = re2.UTF8ToString(replacedStringPointer);

//       freeUpMemory(
//         re2,
//         textPointer,
//         regexPointer,
//         rewritePointer,
//         replacedStringPointer,
//         flagPointer
//       );
//       return replacedString;
//     });

//   test = async (text: string): Promise<boolean> =>
//     await RegExp2().then((re2: Module) => {
//       const [textPointer, regexPointer] = getPointers(re2, text, this.regex);

//       const isFulfilled = !!re2._check(textPointer, regexPointer);

//       freeUpMemory(re2, textPointer, regexPointer);
//       return isFulfilled;
//     });
// }
