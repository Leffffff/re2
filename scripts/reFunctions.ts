import {
  freeUpMemory,
  getGroups,
  getPointers,
  getPosition,
  getStringsFromPointerArray,
} from './utils';

export const testRegex = (
  module: Module,
  text: string,
  regex: string
): boolean => {
  const [textPointer, regexPointer] = getPointers(module, text, regex);

  const isFulfilled = !!module._check(textPointer, regexPointer);

  freeUpMemory(module, textPointer, regexPointer);
  return isFulfilled;
};

const isEmpty = (el: string): boolean => el.length > 0; // maybe delete 

export const execRegex = (
  module: Module,
  text: string,
  regex: string,
  flag = ''
): string[][] => {
  const [regexPointer] = getPointers(module, regex);
  let [textPointer] = getPointers(module, text);

  const captureGroups = module._getNumberOfCapturingGroups(regexPointer);
  if (captureGroups < 0) throw Error('Error with groups');

  if (captureGroups === 0) {
    return []; // Regex doesn't have capture group(s)
  }

  const array: string[][] = [];
  if (flag === 'g') {
    const groups = getGroups(module, regexPointer, captureGroups);
    const position = getPosition(groups);
    while (true) {
      textPointer = getPointers(module, text)[0];
      const arrayPointer = module._getCapturingGroups(
        textPointer,
        regexPointer
      );
      if (arrayPointer === 0) break;

      const arr = getStringsFromPointerArray(
        module,
        arrayPointer,
        captureGroups
      );
      array.push(arr.filter(isEmpty));
      text = text.slice(position(module, text, arr));
    }
  } else {
    const arrayPointer = module._getCapturingGroups(textPointer, regexPointer);
    const stringArray = getStringsFromPointerArray(
      module,
      arrayPointer,
      captureGroups
    );
    array.push(stringArray.filter(isEmpty));
  }

  freeUpMemory(module, textPointer, regexPointer);
  return array;
};

export const replaceString = ({
  module,
  baseText,
  regex,
  rewrite,
  flag = '',
}: ReplaceInput): string => {
  const [textPointer, regexPointer, rewritePointer, flagPointer] = getPointers(
    module,
    baseText,
    regex,
    rewrite,
    flag
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
