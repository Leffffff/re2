export const errorHandler = (value: unknown, message: string): void => {
  if (typeof value === 'undefined' || value === null)
    throw TypeError(`${message} ${value === null ? null : typeof value}.`);
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

const isBalancedParenthesis = (string: string): boolean =>
  !string.split('').reduce((uptoPrevChar, thisChar, index) => {
    if (thisChar === '(' || thisChar === '{' || thisChar === '[')
      return string[index - 1] === '\\' ? uptoPrevChar : ++uptoPrevChar;

    if (thisChar === ')' || thisChar === '}' || thisChar === ']')
      return string[index - 1] === '\\' ? uptoPrevChar : --uptoPrevChar;

    return uptoPrevChar;
  }, 0);

export const validate = (re2: RegExp2, regex: string): void => {
  errorHandler(regex, 'Regular expression can not be');

  const [regexPointer] = getPointers(re2, regex);
  const statusPointer = re2._validate(regexPointer);
  const error = re2.UTF8ToString(statusPointer);
  freeUpMemory(re2, regexPointer, statusPointer);
  if (!!error) throw error;

  if (!isBalancedParenthesis(regex))
    throw Error(`Invalid regex. Check parenthesis ${regex}`);
};
