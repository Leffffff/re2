import { isNullOrUndefined } from 'util';
import { freeUpMemory, getPointers, getStringsFromPointerArray } from './utils';

export const testRegex = (
  module: Module,
  text: string,
  regex: string
): boolean => {
  if (isNullOrUndefined(text)) text = `${text}`; // RegExp works with null or undefined like just strings 'null' or 'undefined'
  const [textPointer, regexPointer] = getPointers(module, text, regex);

  const isFulfilled = !!module._check(textPointer, regexPointer);

  freeUpMemory(module, textPointer, regexPointer);
  return isFulfilled;
};

const isEmpty = (el: string): boolean => el.length > 0;

export const execRegex = (
  module: Module,
  text: string,
  regex: string,
  flag = ''
): string[][] => {
  if (isNullOrUndefined(text)) text = `${text}`; // RegExp works with text = null or undefined as text like just strings 'null' or 'undefined'
  const [regexPointer] = getPointers(module, `(${regex})`);
  let [textPointer] = getPointers(module, text);

  const captureGroups = module._getNumberOfCapturingGroups(regexPointer);
  if (captureGroups < 0) throw Error('Error with groups');

  if (captureGroups === 0) return []; // Regex doesn't have capture group(s)

  const array: string[][] = [];
  if (flag === 'g') {
    while (true) {
      textPointer = getPointers(module, text)[0];
      const arrayPointer = module._getCapturingGroups(
        textPointer,
        regexPointer
      );
      if (arrayPointer === 0) break;

      const [fullMatch, ...rest] = getStringsFromPointerArray(
        module,
        arrayPointer,
        captureGroups
      );
      array.push(rest.filter(isEmpty));
      text = text.slice(text.indexOf(fullMatch) + fullMatch.length);
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
