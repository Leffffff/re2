const Module = require('../../bin/re2Lib.js');

//my_test.cc
Module.onRuntimeInitialized = () => {
  //Its like main() function
  var text = '{"identity":{"__type":"Identity:ECP","DisplayName":"alak_e_end","RawIdentity":"160ed57b-b1c9-4c73-bffa-d6ca6c1131adaa_huiasdjkgahdsgagds12371et7dgadggj21fjfyedjqg1fj2fjf3fjjdajh214jhjwdagh2gh1hg3g1j2gj3ggdasgkdgk1gk2gk3gk1ghk2kgkgjdgkjgk1gkkg2gk3gkgjkkhasadsca6c1131adaa_huiasdjkgahdsgagds12371et7dgadggj21fjfyedjqg1fj2fjf3fjjdajh214jhjwdagh2gh1hg3g1j2gj3ggdasgkdgk1gk2gk3gk1ghk2kgkgjdgkjgk1gkkg2gk3gkgjkkhasadsca6c1131adaa_huiasdjkgahdsgagds12371et7dgadggj21fjfyedjqg1fj2fjf3fjjdajh214jhjwdagh2gh1hg3g1j2gj3ggdasgkdgk1gk2gk3gk1ghk2kgkgjdgkjgk1gkkg2gk3gkgjkkhasadsadsaddsga31312421_end"},"properties":{"Parameters":{"__type":"JsonDictionaryOfanyType:#Microsoft.Exchange.Management.ControlPanel","GrantSendOnBehalfTo":[{"__type":"Identity:ECP","DisplayName":"Steven Miller","RawIdentity":"bf14ec48-1a36-4c7c-8b62-46ad87263df0"}],"EmailAddresses":["SIP:alak@veridinet.onmicrosoft.com","SMTP:alak@veridinet.onmicrosoft.com","smtp:cgcngnngnxfn@veridinet.onmicrosoft.com","SPO:SPO_53bef9c4-baf5-4a18-8e9e-4b126ccff6e7@SPO_73f5d3eb-40ae-45bd-82b4-20a92a4187c7"]}}{"identity":{"__type":"Identity:ECP","DisplayName":"alak_e_end","RawIdentity":"160ed57b-b1c9-4c73-bffa-d6ca6c1131adaa_huiasdjkgahdsgagds12371et7dgadggj21fjfyedjqg1fj2fjf3fjjdajh214jhjwdagh2gh1hg3g1j2gj3ggdasgkdgk1gk2gk3gk1ghk2kgkgjdgkjgk1gkkg2gk3gkgjkkhasadsca6c1131adaa_huiasdjkgahdsgagds12371et7dgadggj21fjfyedjqg1fj2fjf3fjjdajh214jhjwdagh2gh1hg3g1j2gj3ggdasgkdgk1gk2gk3gk1ghk2kgkgjdgkjgk1gkkg2gk3gkgjkkhasadsca6c1131adaa_huiasdjkgahdsgagds12371et7dgadggj21fjfyedjqg1fj2fjf3fjjdajh214jhjwdagh2gh1hg3g1j2gj3ggdasgkdgk1gk2gk3gk1ghk2kgkgjdgkjgk1gkkg2gk3gkgjkkhasadsadsaddsga31312421_end"},"properties":{"Parameters":{"__type":"JsonDictionaryOfanyType:#Microsoft.Exchange.Management.ControlPanel","GrantSendOnBehalfTo":[{"__type":"Identity:ECP","DisplayName":"Steven Miller","RawIdentity":"bf14ec48-1a36-4c7c-8b62-46ad87263df0"}],"EmailAddresses":["SIP:alak@veridinet.onmicrosoft.com","SMTP:alak@veridinet.onmicrosoft.com","smtp:cgcngnngnxfn@veridinet.onmicrosoft.com","SPO:SPO_53bef9c4-baf5-4a18-8e9e-4b126ccff6e7@SPO_73f5d3eb-40ae-45bd-82b4-20a92a4187c7"]}}';

  var regex = '"DisplayName":"([^"]+).+?"RawIdentity":"([^"]+)'
  // // var regex = '"DisplayName":"([^"]+).+?"RawIdentity":"([^"]+).+?"SIP:([^"]+)"'

  // const regex = '(hello).+?(vasyan)(.)';
  // const text = 'hellohellohello = hui gvono vasyan123 hellohellohello = hui gvono vasyan123';
  const f = 'g'

  const textStringOnWasmHeap = Module._malloc(text.length + 1);
  Module.stringToUTF8(text, textStringOnWasmHeap, text.length + 1);

  const flagP = Module._malloc(f.length + 1);
  Module.stringToUTF8(f, flagP, f.length + 1);

  const regexStringOnWasmHeap = Module._malloc(regex.length + 1);
  Module.stringToUTF8(regex, regexStringOnWasmHeap, regex.length + 1);

  const captureGroups = Module._getNumberOfCapturingGroups(
    regexStringOnWasmHeap
  );
  if (captureGroups < 0) {
    console.log('captureGroups-ERROR');
  }

  const arrayPtr = Module._exec(
    textStringOnWasmHeap,
    regexStringOnWasmHeap,
    flagP
  );
  if (arrayPtr === 0) {
    console.log('arrayPtr-ERROR');
  }

  const getCountOfGroups = Module._getCountOfGroups(
    textStringOnWasmHeap,
    regexStringOnWasmHeap,
    flagP
  );
  console.log("Module.onRuntimeInitialized -> getCountOfGroups", getCountOfGroups)
let arr = []
  for (let i = 0; i < getCountOfGroups; ++i) {
    let arr2 = []
    for (let j = 0; j < captureGroups; ++j) {
      const stringPtr = Module._getStringPtrByIndex(arrayPtr, i, j);
      const string = Module.UTF8ToString(stringPtr);
      arr2.push(string);
    }
    arr.push(arr2)
  }
  console.log('matchAll = ', arr)
};
