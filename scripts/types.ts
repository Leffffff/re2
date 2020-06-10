type Address = number;

type Module = {
  /** @function _malloc : allocates memory and returns address. */
  _malloc(len: number): number;

  /** @function stringToUTF8 : copies string to address. */
  stringToUTF8(s: string, a: Address, len: number): void;

  /** @function _free : frees up memory by address. */
  _free(a: Address): void;

  /** @function _validate : validates regex by address and return address to status of validation. */
  _validate(a: Address): Address;

  /** @function UTF8ToString : gets string by address. */
  UTF8ToString(a: Address): string;

  /** @function _getNumberOfCapturingGroups : returns number of capture groups. */
  _getNumberOfCapturingGroups(a: Address): number;

  /** @function _getCapturingGroups : returns address to array of groups. */
  _getCapturingGroups(textA: Address, reA: Address): Address;

  /** @function _getStringPtrByIndex : returns address of array element by index. */
  _getStringPtrByIndex(arrayA: Address, index: number): Address;

  /** @function _clearArray : clears pointer array. (will be depricated) (We think this function is similiar to _free) */
  _clearArray(arrayA: Address, n: number): void;

  /** @function _singleMatch : returns address of matched string by single capture string */
  _singleMatch(textA: Address, reA: Address): Address;

  /** @function _check : returns boolean if regex matches string */
  _check(textA: Address, reA: Address): 0 | 1;

   /** @function _replace : return with some or all matches of a pattern replaced by a replacement  */
  _replace(basicA: Address, fromA: Address, toA: Address, flagA: Address): Address;
};
