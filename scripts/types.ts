type Pointer = number;

type RegExp2 = {
  /** @function _malloc : allocates memory and returns address. */
  _malloc(len: number): number;

  /** @function _free : frees up memory by address. */
  _free(ptr: Pointer): void;

  /** @function stringToUTF8 : copies string to address. */
  stringToUTF8(s: string, ptr: Pointer, len: number): void;

  /** @function UTF8ToString : gets string by address. */
  UTF8ToString(ptr: Pointer): string;

  /** @function _validate : validates regex by address and return address to status of validation. */
  _validate(ptr: Pointer): Pointer;

  /** @function _getQtyOfCapturingGroups : returns number of capture groups. */
  _getQtyOfCapturingGroups(ptr: Pointer): number;

  /** @function _exec : returns address to array of groups. */
  _exec(sPtr: Pointer, rePtr: Pointer, flagP: Pointer): Pointer;

  /** @function _getStringPtrFromMatrix : returns address of array element by index. */
  _getStringPtrFromMatrix(
    arrayPtr: Pointer,
    raw: number,
    column: number
  ): Pointer;

  /** @function _getQtyOfMatchedGroups : returns number of matched groups. */
  _getQtyOfMatchedGroups(
    textP: Pointer,
    regexP: Pointer,
    flagP: Pointer
  ): number;

  /** @function _check : returns boolean if regex matches string. */
  _check(sPtr: Pointer, rePtr: Pointer): 0 | 1;

  /** @function _replace : returns pointer to new string with some or all matches of a pattern replaced by a replacement. */
  _replace(
    basicPtr: Pointer,
    fromPtr: Pointer,
    toPtr: Pointer,
    flagPtr: Pointer
  ): Pointer;
};

type ReplaceParams = 'string' | 'regex' | 'rewrite' | 'flag';

type ReplaceInput = {
  re2: RegExp2;
} & {
  [k in ReplaceParams]: string;
};
