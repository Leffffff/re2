type Pointer = number;

type Module = {
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

  /** @function _getNumberOfCapturingGroups : returns number of capture groups. */
  _getNumberOfCapturingGroups(ptr: Pointer): number;

  /** @function _getCapturingGroups : returns address to array of groups. */
  _getCapturingGroups(textPtr: Pointer, rePtr: Pointer): Pointer;

  /** @function _getStringPtrByIndex : returns address of array element by index. */
  _getStringPtrByIndex(arrayPtr: Pointer, index: number): Pointer;

  /** @function _clearArray : clears pointer array. (will be depricated) (We think this function is similiar to _free) */
  _clearArray(arrayPtr: Pointer, n: number): void;

  /** @function _singleMatch : returns address of matched string by single capture string. */
  _singleMatch(textPtr: Pointer, rePtr: Pointer): Pointer;

  /** @function _check : returns boolean if regex matches string. */
  _check(textPtr: Pointer, rePtr: Pointer): 0 | 1;

  /** @function _replace : return new string with some or all matches of a pattern replaced by a replacement. */
  _replace(
    basicPtr: Pointer,
    fromPtr: Pointer,
    toPtr: Pointer,
    flagPtr: Pointer
  ): Pointer;
};
