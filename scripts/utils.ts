import { createRequire } from 'module';

const newRequire = createRequire(import.meta.url);
const chalk = newRequire('chalk');
const chalkInstance = new chalk.Instance({
  level: 1,
});

export const errorHandler = (value: unknown, message: string): void => {
  if (typeof value === 'undefined' || value === null)
    throw TypeError(
      chalkInstance.red(
        `${message} ${chalkInstance.underline(
          value === null ? null : typeof value
        )}.`
      )
    );
};

export const freeUpMemory = (re2: RegExp2, ...ptrs: Pointer[]): void =>
  ptrs.forEach(re2._free);

export const stringOnWasmHeap = (re2: RegExp2) => (string: string): Pointer => {
  const size = string.length + 1;
  const ptr = re2._malloc(size);
  re2.stringToUTF8(string, ptr, size);
  return ptr;
};

export const getPointers = (re2: RegExp2, ...values: string[]): Pointer[] =>
  values.map(stringOnWasmHeap(re2));

export const getStringArray = (
  re2: RegExp2,
  arrayPointer: Pointer,
  getCountOfGroups: number,
  captureGroups: number
): string[][] => {
  const arr = [];
  for (let i = 0; i < getCountOfGroups; i += 1) {
    const arr2 = [];
    for (let j = 0; j < captureGroups; j += 1) {
      const stringPtr = re2._getStringPtrFromMatrix(arrayPointer, i, j);
      const string = re2.UTF8ToString(stringPtr);
      arr2.push(string);
    }
    arr.push(arr2);
  }
  return arr;
};

export const validate = (re2: RegExp2, regex: string): void => {
  const [regexPointer] = getPointers(re2, regex);
  const statusPointer = re2._validate(regexPointer);
  if (statusPointer !== 0) throw Error(re2.UTF8ToString(statusPointer));

  freeUpMemory(re2, regexPointer, statusPointer);
};
