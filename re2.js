const RegExp2 = require("./re2Lib.js");

exports.match = async (text, regex) => {
  return await RegExp2().then((re2) => {
    const textStringOnWasmHeap = re2._malloc(text.length + 1);
    re2.stringToUTF8(text, textStringOnWasmHeap, text.length + 1);

    const regexStringOnWasmHeap = re2._malloc(regex.length + 1);
    re2.stringToUTF8(regex, regexStringOnWasmHeap, regex.length + 1);

    return re2.UTF8ToString(
      re2._singleMatch(textStringOnWasmHeap, regexStringOnWasmHeap)
    );
  });
};

exports.check = async (text, regex) => {
  return await RegExp2().then((re2) => {
    const textStringOnWasmHeap = re2._malloc(text.length + 1);
    re2.stringToUTF8(text, textStringOnWasmHeap, text.length + 1);

    const regexStringOnWasmHeap = re2._malloc(regex.length + 1);
    re2.stringToUTF8(regex, regexStringOnWasmHeap, regex.length + 1);

    return !!re2._check(textStringOnWasmHeap, regexStringOnWasmHeap);
  });
};
