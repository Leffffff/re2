export const freeUpMemory = (module: Module, ...ptrs: Pointer[]): void =>
  ptrs.forEach(module._free);

export const stringOnWasmHeap = (module: Module) => (
  string: string
): Pointer => {
  const ptr = module._malloc(string.length + 1);
  module.stringToUTF8(string, ptr, string.length + 1);
  return ptr;
};

export const getPointers = (module: Module, ...values: string[]): Pointer[] =>
  values.map(stringOnWasmHeap(module));

export const getStringsFromPointerArray = (
  module: Module,
  arrayPointer: number,
  captureGroups: number
): string[] => {
  const arr: string[] = [];
  for (let i = 0; i < captureGroups; ++i) {
    const stringPtr = module._getStringPtrByIndex(arrayPointer, i);
    const string = module.UTF8ToString(stringPtr);
    freeUpMemory(module, stringPtr);
    arr.push(string);
  }
  freeUpMemory(module, arrayPointer);
  return arr || [];
};

// old -> '(.+?)\\((?:[^?]|\\?[^:i\-])+\\)';
// fixed? no. try1 -> '(.+?)\\((?:[^?]|[^:i-])+\\)';
// fixed with -> '(.+?)\\((?:[^?]|[^?][^-i:]).+?\\)';
const regex = '(.+?)\\((?:[^?]|[^?][^-i:]).+?\\)';
export const getGroups = (
  module: Module,
  regexPointer: Pointer,
  captureGroups: number
): string[] => {
  const repeat = regex.repeat(captureGroups);
  const [repeatP] = getPointers(module, repeat);
  const arrayPointer = module._getCapturingGroups(regexPointer, repeatP);
  const arr = getStringsFromPointerArray(module, arrayPointer, captureGroups);
  freeUpMemory(module, repeatP);
  return arr;
};

const escapeMetaCharacter = (module: Module, str: string): string => {
  const [textPointer] = getPointers(module, str);
  const escapedPointer = module._escapeMetaCharacter(textPointer);
  const modifiedText = module.UTF8ToString(escapedPointer);
  freeUpMemory(module, textPointer, escapedPointer);
  return modifiedText;
};

const fullMatchRegex = (
  module: Module,
  groups: string[],
  array: string[]
): string =>
  '(' +
  groups.map((el, i) => el + escapeMetaCharacter(module, array[i])).join('') +
  ')';

export const getPosition = (groups: string[]) => (
  module: Module,
  text: string,
  array: string[]
): number => {
  const foundString = fullMatchRegex(module, groups, array);
  const [textPointer, foundStringPointer] = getPointers(
    module,
    text,
    foundString
  );

  const arrayP = module._getCapturingGroups(textPointer, foundStringPointer);
  freeUpMemory(module, textPointer, foundStringPointer);
  const [fullCapture] = getStringsFromPointerArray(module, arrayP, 1);
  const pos = text.indexOf(fullCapture);
  return pos + fullCapture.length;
};

export const validate = (module: Module, regex: string): void => {
  const [regexPointer] = getPointers(module, regex);
  const statusPointer = module._validate(regexPointer);
  if (statusPointer !== 0) throw Error(module.UTF8ToString(statusPointer));

  freeUpMemory(module, regexPointer, statusPointer);
};
