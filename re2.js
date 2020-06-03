const RegExp2 = require("./re2Lib.js");

const match = async (text, regex) => {
  return await RegExp2().then((re2) => {
    const textAddress = stringOnWasmHeap(re2, text);
    const regexAddress = stringOnWasmHeap(re2, regex);

    const matchedAddress = re2._singleMatch(textAddress, regexAddress);
    const matchedString = matchedAddress !== 0
      ? re2.UTF8ToString(matchedAddress)
      : null;

    freeUpMemory(re2, [textAddress, regexAddress, matchedAddress]);
    return matchedString;
  });
};

const check = async (text, regex) => {
  return await RegExp2().then((re2) => {
    const textAddress = stringOnWasmHeap(re2, text);
    const regexAddress = stringOnWasmHeap(re2, regex);

    const isFulfilled = !!re2._check(textAddress, regexAddress);

    freeUpMemory(re2, [textAddress, regexAddress]);
    return isFulfilled;
  });
};

const freeUpMemory = (module, ptrs) => ptrs.forEach(module._free);

const stringOnWasmHeap = (module, string) => {
  const address = module._malloc(string.length + 1);
  module.stringToUTF8(string, address, string.length + 1);
  return address;
};

module.exports = {
  match, check
};