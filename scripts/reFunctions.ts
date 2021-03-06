import {
  errorHandler,
  freeUpMemory,
  getPointers,
  getStringArray,
} from './utils';

export const re2Functions = (
  re2: RegExp2,
  regex: string,
  flag: string
): RE2Functions => {
  return {
    testRegex: (text: string): boolean => {
      errorHandler(text, 'Input text can not be');
      const string = `${text}`;
      const [textPointer, regexPointer] = getPointers(re2, string, regex);

      const isFulfilled = !!re2._check(textPointer, regexPointer);

      freeUpMemory(re2, textPointer, regexPointer);
      return isFulfilled;
    },
    execRegex: (text: string): string[][] | null => {
      errorHandler(text, 'Input text can not be');
      // if object come in
      const string = `${text}`;

      const [textPointer, regexPointer, flagPointer] = getPointers(
        re2,
        string,
        regex,
        flag
      );

      const captureGroups = re2._getQtyOfCapturingGroups(regexPointer) + 1;
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
    },
    replaceString: ({ string, rewrite }: ReplaceInput): string => {
      errorHandler(string, 'Input text can not be');
      errorHandler(rewrite, 'Replacement string can not be');
      // if object come in
      const text = `${string}`;
      const rewriteString = `${rewrite}`;

      const [
        textPointer,
        regexPointer,
        rewritePointer,
        flagPointer,
      ] = getPointers(re2, text, regex, rewriteString, flag);

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
    },
  };
};
