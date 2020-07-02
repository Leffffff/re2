import { isNullOrUndefined } from 'util';
import { freeUpMemory, getPointers, getStringArray } from './utils';

export const testRegex = (
  re2: RegExp2,
  text: string,
  regex: string
): boolean => {
  if (isNullOrUndefined(text)) text = `${text}`;
  const [textPointer, regexPointer] = getPointers(re2, text, regex);

  const isFulfilled = !!re2._check(textPointer, regexPointer);

  freeUpMemory(re2, textPointer, regexPointer);
  return isFulfilled;
};

export const execRegex = (
  re2: RegExp2,
  text: string,
  regex: string,
  flag = ''
): string[][] | null => {
  if (isNullOrUndefined(text)) text = `${text}`;
  const [textPointer, regexPointer, flagPointer] = getPointers(
    re2,
    text,
    regex,
    flag
  );

  const captureGroups = re2._getQtyOfCapturingGroups(regexPointer);
  if (captureGroups < 0) throw Error('Error with groups');

  if (captureGroups === 0) return null;

  const arrayPointer = re2._exec(textPointer, regexPointer, flagPointer);
  if (arrayPointer === 0) return null;

  const matchedGroups = re2._getQtyOfMatchedGroups(
    textPointer,
    regexPointer,
    flagPointer
  );

  const matched = getStringArray(
    re2,
    arrayPointer,
    matchedGroups,
    captureGroups
  );

  freeUpMemory(re2, textPointer, regexPointer, arrayPointer, flagPointer);
  return matched;
};

export const replaceString = ({
  re2,
  baseText,
  regex,
  rewrite,
  flag = '',
}: ReplaceInput): string => {
  const [textPointer, regexPointer, rewritePointer, flagPointer] = getPointers(
    re2,
    baseText,
    regex,
    rewrite,
    flag
  );

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
    flagPointer,
    replacedStringPointer
  );
  return replacedString;
};
