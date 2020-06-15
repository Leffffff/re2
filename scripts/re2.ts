const RegExp2 = require('../../re2Lib');

const freeUpMemory = (module: Module, ...ptrs: Pointer[]): void =>
  ptrs.forEach(module._free);

const stringOnWasmHeap = (module: Module) => (string: string): Pointer => {
  const ptr = module._malloc(string.length + 1);
  module.stringToUTF8(string, ptr, string.length + 1);
  return ptr;
};

const getPointers = (module: Module, ...values: string[]): Pointer[] =>
  values.map(stringOnWasmHeap(module));

export class RE2 {
  private regex!: string;

  constructor(regex: string) {
    new Promise(async resolve => {
      await this.validate(regex);
      this.regex = regex;
      resolve(this);
    });
  }

  private validate = async (regex: string): Promise<void> =>
    await RegExp2().then((re2: Module) => {
      const [regexPointer] = getPointers(re2, regex);
      const statusPointer = re2._validate(regexPointer);
      const status = re2.UTF8ToString(statusPointer);

      if (status !== 'ok') throw Error(status);
      freeUpMemory(re2, regexPointer, statusPointer);
    });

  numberOfCaptureGroups = async (): Promise<void> =>
    await RegExp2().then((re2: Module) => {
      const [regexPointer] = getPointers(re2, this.regex);
      return re2._getNumberOfCapturingGroups(regexPointer);
    });

  match = async (text: string, flag?: string): Promise<string[] | string[][]> =>
    await RegExp2().then(async (re2: Module) => {
      console.log(this.regex);
      if (flag === 'g') {
        const gArr = await this.globalMatch(re2, text);
        console.log(gArr && gArr.length);
        return gArr;
      }
      const [textPointer, regexPointer] = getPointers(re2, text, this.regex);

      const captureGroups = re2._getNumberOfCapturingGroups(regexPointer);
      if (captureGroups < 0) throw Error('Error with groups');

      if (captureGroups === 0) {
        console.log("Regex doesn't have capture group(s)");
        return null;
      }

      const arrayPtr = re2._getCapturingGroups(textPointer, regexPointer);

      if (arrayPtr === 0) return null; // no matched string

      const arr: string[] = [];
      for (let i = 0; i < captureGroups; ++i) {
        const stringPtr = re2._getStringPtrByIndex(arrayPtr, i);
        const string = re2.UTF8ToString(stringPtr);
        freeUpMemory(re2, stringPtr);
        arr.push(string);
      }

      freeUpMemory(re2, textPointer, regexPointer, arrayPtr);
      return arr;
    });

  private globalMatch = async (
    module: Module,
    text: string
  ): Promise<string[][] | null> => {
    const gArr = [];
    const [regexPointer] = getPointers(module, this.regex);

    const captureGroups = module._getNumberOfCapturingGroups(regexPointer);
    if (captureGroups < 0) throw Error('Error with groups');

    let [textPointer] = getPointers(module, text);

    while (await this.test(text)) {
      textPointer = getPointers(module, text)[0];
      if (captureGroups === 0) {
        console.log("Regex doesn't have capture group(s)");
        return null;
      }

      const arrayPtr = module._getCapturingGroups(textPointer, regexPointer);

      if (arrayPtr === 0) return null; // no matched string

      const arr: string[] = [];
      for (let i = 0; i < captureGroups; ++i) {
        const stringPtr = module._getStringPtrByIndex(arrayPtr, i);
        const string = module.UTF8ToString(stringPtr);
        freeUpMemory(module, stringPtr);
        arr.push(string);
      }
      gArr.push(arr);
      const pos =
        text.indexOf(arr[arr.length - 1]) + arr[arr.length - 1].length;
      text = text.slice(pos);
      freeUpMemory(module, arrayPtr);
      // module._clearArray(arrayPtr, captureGroups);
    }
    freeUpMemory(module, regexPointer, textPointer);
    return gArr;
  };

  exec = async (text: string): Promise<string> =>
    await RegExp2().then((re2: Module) => {
      const [textPointer, regexPointer] = getPointers(re2, text, this.regex);

      const matchedPointer = re2._singleMatch(textPointer, regexPointer);
      const matchedString =
        matchedPointer !== 0 ? re2.UTF8ToString(matchedPointer) : null;

      freeUpMemory(re2, textPointer, regexPointer, matchedPointer);
      return matchedString;
    });

  static replace = async (
    baseText: string,
    regex: string,
    rewrite: string,
    flag?: string
  ): Promise<string> =>
    await RegExp2().then((re2: Module) => {
      const [
        textPointer,
        regexPointer,
        flagPointer,
        rewritePointer,
      ] = getPointers(re2, baseText, regex, flag || '', rewrite);

      const replacedStringPointer = re2._replace(
        textPointer,
        regexPointer,
        rewritePointer,
        flagPointer
      );
      const replacedString = re2.UTF8ToString(replacedStringPointer);

      freeUpMemory(
        re2,
        textPointer,
        regexPointer,
        rewritePointer,
        replacedStringPointer,
        flagPointer
      );
      return replacedString;
    });

  test = async (text: string): Promise<boolean> =>
    await RegExp2().then((re2: Module) => {
      const [textPointer, regexPointer] = getPointers(re2, text, this.regex);

      const isFulfilled = !!re2._check(textPointer, regexPointer);

      freeUpMemory(re2, textPointer, regexPointer);
      return isFulfilled;
    });
}
