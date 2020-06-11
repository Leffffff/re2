import { resolve } from 'path';
const path = resolve(__dirname, '../../re2Lib');
const RegExp2 = require(path);

const freeUpMemory = (module: Module, ptrs: Address[]): void =>
  ptrs.forEach(module._free);

const stringOnWasmHeap = (module: Module, string: string): Address => {
  const address = module._malloc(string.length + 1);
  module.stringToUTF8(string, address, string.length + 1);
  return address;
};

const validate = async (regex: string): Promise<string> =>
  await RegExp2().then((re2: Module) => {
    const regexAddress = stringOnWasmHeap(re2, regex);
    const statusAddress = re2._validate(regexAddress);
    const status = re2.UTF8ToString(statusAddress);

    if (status !== 'ok') throw Error(status);
    freeUpMemory(re2, [regexAddress, statusAddress]);
    return regex;
  });

export class RE2 {
  private regex!: string;
  constructor(regex: string) {
    new Promise(async resolve => {
      this.regex = await validate(regex);
      resolve(this);
    });
  }

  numberOfCaptureGroups = async (): Promise<void> => {
    return await RegExp2().then((re2: Module) => {
      const regexAddress = stringOnWasmHeap(re2, this.regex);
      return re2._getNumberOfCapturingGroups(regexAddress);
    });
  };

  match = async (text: string): Promise<string[]> => {
    return await RegExp2().then((re2: Module) => {
      const textAddress = stringOnWasmHeap(re2, text);
      const regexAddress = stringOnWasmHeap(re2, this.regex);
      
      const captureGroups = re2._getNumberOfCapturingGroups(regexAddress);
      if (captureGroups < 0) throw Error('Error with groups');

      if (captureGroups === 0) {
        console.log("Regex doesn't have capture group(s)");
        return null;
      }

      const arrayPtr = re2._getCapturingGroups(textAddress, regexAddress);

      if (arrayPtr === 0) return null; // no matched string

      const arr: string[] = [];
      for (let i = 0; i < captureGroups; ++i) {
        const stringPtr = re2._getStringPtrByIndex(arrayPtr, i);
        const string = re2.UTF8ToString(stringPtr);
        freeUpMemory(re2, [stringPtr]);
        arr.push(string);
      }

      freeUpMemory(re2, [textAddress, regexAddress, arrayPtr]);
      return arr;
    });
  };

  exec = async (text: string): Promise<string> => {
    return await RegExp2().then((re2: Module) => {
      const textAddress = stringOnWasmHeap(re2, text);
      const regexAddress = stringOnWasmHeap(re2, this.regex);

      const matchedAddress = re2._singleMatch(textAddress, regexAddress);
      const matchedString =
        matchedAddress !== 0 ? re2.UTF8ToString(matchedAddress) : null;

      freeUpMemory(re2, [textAddress, regexAddress, matchedAddress]);
      return matchedString;
    });
  };

  static replace = async (
    baseText: string,
    regex: string,
    rewrite: string,
    flag?: string
  ): Promise<string> => {
    return await RegExp2().then((re2: Module) => {
      const textAddress = stringOnWasmHeap(re2, baseText);
      const flagAddress = stringOnWasmHeap(re2, flag || '');
      const rewriteAddress = stringOnWasmHeap(re2, rewrite);
      const regexAddress = stringOnWasmHeap(re2, regex);

      const replacedStringAddress = re2._replace(
        textAddress,
        regexAddress,
        rewriteAddress,
        flagAddress
      );
      const replacedString = re2.UTF8ToString(replacedStringAddress);

      freeUpMemory(re2, [
        textAddress,
        regexAddress,
        rewriteAddress,
        replacedStringAddress,
        flagAddress,
      ]);
      return replacedString;
    });
  };

  test = async (text: string): Promise<boolean> => {
    return await RegExp2().then((re2: Module) => {
      const textAddress = stringOnWasmHeap(re2, text);
      const regexAddress = stringOnWasmHeap(re2, this.regex);

      const isFulfilled = !!re2._check(textAddress, regexAddress);

      freeUpMemory(re2, [textAddress, regexAddress]);
      return isFulfilled;
    });
  };
}
