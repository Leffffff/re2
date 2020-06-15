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

export const getGroups = (regex: string, n: number): string[] => {
  const repeat = `(.+?)\\(.+?\\)`.repeat(n);
  const re = new RegExp(repeat);
  return re.exec(regex) as RegExpExecArray;
};

export const getPosition = (groups: string[]) => (
  text: string,
  array: string[]
): number => {
  const foundString = groups.map((el, i) => el + array[i]).join('');
  const stringToDelete = (new RegExp(foundString).exec(
    text
  ) as RegExpExecArray)[0];
  const pos = text.indexOf(stringToDelete);
  return pos + stringToDelete.length;
};

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
  return arr || [];
};

export const validation = (module: Module, regex: string): void => {
  const [regexPointer] = getPointers(module, regex);
  const statusPointer = module._validate(regexPointer);
  const status = module.UTF8ToString(statusPointer);

  if (status !== 'ok') throw Error(status);
  freeUpMemory(module, regexPointer, statusPointer);
};
