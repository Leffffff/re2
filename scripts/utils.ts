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

export const validate = (module: Module, regex: string): void => {
  const [regexPointer] = getPointers(module, regex);
  const statusPointer = module._validate(regexPointer);
  if (statusPointer !== 0) throw Error(module.UTF8ToString(statusPointer));

  freeUpMemory(module, regexPointer, statusPointer);
};
