const RegExp2 = require("./re2Lib.js");

const freeUpMemory = (module, ptrs) => ptrs.forEach(module._free);

const stringOnWasmHeap = (module, string) => {
  const address = module._malloc(string.length + 1);
  module.stringToUTF8(string, address, string.length + 1);
  return address;
};

const validate = async (regex) =>
  await RegExp2().then(async (re2) => {
    const regexAddress = await stringOnWasmHeap(re2, regex);
    const statusAddress = re2._validate(regexAddress);
    const status = re2.UTF8ToString(statusAddress);

    if (status !== "ok") throw Error(status);
    freeUpMemory(re2, [regexAddress, statusAddress]);
    return regex;
  });

class RE2 {
  constructor(regex) {
    new Promise(async (resolve) => {
      this.regex = await validate(regex);
      resolve(this);
    });
  }

  match = async (text) => {
    return await RegExp2().then((re2) => {
      const textAddress = stringOnWasmHeap(re2, text);
      const regexAddress = stringOnWasmHeap(re2, this.regex);

      const captureGroups = re2._getNumberOfCapturingGroups(regexAddress);
      console.log("RE2 -> match -> captureGroups", captureGroups)
      if (captureGroups < 0) {
        console.log("JS-ERROR");
      }

      console.log("RE2 -> match -> arrayPtr")
      const arrayPtr = re2._getCapturingGroups(textAddress, regexAddress);
      console.log("RE2 -> match -> arrayPtr", arrayPtr)
      if (arrayPtr === 0) {
        console.log("JS-ERROR");
      }

      console.log('START')
      let q = []
      for (let i = 0; i < captureGroups; ++i) {
        const stringPtr = re2._getStringPtrByIndex(arrayPtr, i);
        const string = re2.UTF8ToString(stringPtr);
        console.log(string);
        q.push(string)
      }
      console.log(q)
      console.log('before -> ',arrayPtr)
      re2._clearArray(arrayPtr, captureGroups);
      console.log('after -> ',arrayPtr)

      // freeUpMemory(re2, [textAddress, regexAddress, matchedAddress]);
      return;
    });
  };

  exec = async (text) => {
    return await RegExp2().then((re2) => {
      const textAddress = stringOnWasmHeap(re2, text);
      const regexAddress = stringOnWasmHeap(re2, this.regex);
      // const test = re2._testFunc(textAddress, regexAddress);
      // console.log('INFO: ', re2.UTF8ToString(test));

      const matchedAddress = re2._singleMatch(textAddress, regexAddress);
      const matchedString =
        matchedAddress !== 0 ? re2.UTF8ToString(matchedAddress) : null;

      freeUpMemory(re2, [textAddress, regexAddress, matchedAddress]);
      return matchedString;
    });
  };

  test = async (text) => {
    return await RegExp2().then((re2) => {
      const textAddress = stringOnWasmHeap(re2, text);
      const regexAddress = stringOnWasmHeap(re2, this.regex);

      const isFulfilled = !!re2._check(textAddress, regexAddress);

      freeUpMemory(re2, [textAddress, regexAddress]);
      return isFulfilled;
    });
  };
}

module.exports = RE2;
