type Pointer = number;

type Module = {
  /** @function onRuntimeInitialized : init RE2 component. */
  onRuntimeInitialized(): RE2;

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
  _getCapturingGroups(sPtr: Pointer, rePtr: Pointer): Pointer;

  /** @function _getStringPtrByIndex : returns address of array element by index. */
  _getStringPtrByIndex(arrayPtr: Pointer, index: number): Pointer;

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

type ReplaceParams = 'baseText' | 'regex' | 'rewrite' | 'flag';

type ReplaceInput = {
  module: Module;
} & {
  [k in ReplaceParams]: string;
};

type RE2 = {
  /** @function numberOfCaptureGroups : returns number of capture groups. */
  numberOfCaptureGroups(): number;

  /** @function _replace : returns boolean if regex matches string. */
  test(s: string): boolean;

  /** @function _replace : returns array of matched capture groups or empty array.
   *
   * @example
   * s = '"User":"Alexandr","Number":"17","User":"Sanya","Number":"1337"'
   *
   * if
   * re = '"User":"([^"]+).+?Number":"([^"]+)', 'g'
   * output = [ [Alexandr, 17], [Sanya, 1337] ]
   *
   * if
   * re = '"User":"([^"]+).+?Number":"([^"]+)'
   * output = [ [ Alexandr, 17 ] ]
   *
   * if
   * re = '"User":"([^"]+)', 'g'
   * output = [ [Alexandr, Sanya] ]
   *
   * if
   * re = '"Number":"([^"]+)'
   * output = [ [ 17 ] ]
   */
  exec(s: string): string[][];

  /** @function _replace : return new string with some or all matches of a pattern replaced by a replacement. */
  replace(s: string, rewrite: string): string;
};
