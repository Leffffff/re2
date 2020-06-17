import {
  freeUpMemory,
  getGroups,
  getPointers,
  getPosition,
  getStringsFromPointerArray,
} from './utils';

export const testFunction = (
  module: Module,
  text: string,
  regex: string
): boolean => {
  const [textPointer, regexPointer] = getPointers(module, text, regex);

  const isFulfilled = !!module._check(textPointer, regexPointer);

  freeUpMemory(module, textPointer, regexPointer);
  return isFulfilled;
};

export const globalExec = (
  module: Module,
  text: string,
  regex: string
): string[][] | null => {
  const [regexPointer] = getPointers(module, regex);

  const captureGroups = module._getNumberOfCapturingGroups(regexPointer);
  if (captureGroups < 0) throw Error('Error with groups');

  if (captureGroups === 0) {
    console.log("Regex doesn't have capture group(s)");
    return null;
  }

  const groups = getGroups(module, regexPointer, captureGroups);
  const position = getPosition(groups);

  let [textPointer] = getPointers(module, text);
  const gArr = [];

  while (true) {
    textPointer = getPointers(module, text)[0];
    const arrayPointer = module._getCapturingGroups(textPointer, regexPointer);
    if (arrayPointer === 0) break;

    const arr = getStringsFromPointerArray(module, arrayPointer, captureGroups);
    gArr.push(arr);
    text = text.slice(position(text, arr));
  }
  freeUpMemory(module, regexPointer, textPointer);
  return gArr[0] ? gArr : null;
};

export const execFunction = (
  module: Module,
  text: string,
  regex: string
): string[] | null => {
  const [textPointer, regexPointer] = getPointers(module, text, regex);

  const captureGroups = module._getNumberOfCapturingGroups(regexPointer);
  if (captureGroups < 0) throw Error('Error with groups');

  if (captureGroups === 0) {
    console.log("Regex doesn't have capture group(s)");
    return null;
  }

  const arrayPointer = module._getCapturingGroups(textPointer, regexPointer);
  if (arrayPointer === 0) return null; // no matched string

  const arr = getStringsFromPointerArray(module, arrayPointer, captureGroups);

  freeUpMemory(module, textPointer, regexPointer);
  return arr;
};

export const replaceFunction = ({
  module,
  baseText,
  regex,
  rewrite,
  flag,
}: ReplaceInput): string => {
  const [textPointer, regexPointer, rewritePointer, flagPointer] = getPointers(
    module,
    baseText,
    regex,
    rewrite,
    flag || ''
  );

  const replacedStringPointer = module._replace(
    textPointer,
    regexPointer,
    rewritePointer,
    flagPointer
  );
  const replacedString = module.UTF8ToString(replacedStringPointer);

  freeUpMemory(
    module,
    textPointer,
    regexPointer,
    rewritePointer,
    flagPointer,
    replacedStringPointer
  );
  return replacedString;
};
