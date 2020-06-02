const Module = require("./re2.js");

// const check = (text, regex) => {
//   Module.onRuntimeInitialized = () => {
//     const textStringOnWasmHeap = Module._malloc(text.length + 1);
//     Module.stringToUTF8(text, textStringOnWasmHeap, text.length + 1);

//     const regexStringOnWasmHeap = Module._malloc(regex.length + 1);
//     Module.stringToUTF8(regex, regexStringOnWasmHeap, regex.length + 1);

//     return Module._boolTestFunc(textStringOnWasmHeap, regexStringOnWasmHeap);
//   };
// };

// const match = (text, regex) => {
//   Module.onRuntimeInitialized = () => {
//     const textStringOnWasmHeap = Module._malloc(text.length + 1);
//     Module.stringToUTF8(text, textStringOnWasmHeap, text.length + 1);

//     const regexStringOnWasmHeap = Module._malloc(regex.length + 1);
//     Module.stringToUTF8(regex, regexStringOnWasmHeap, regex.length + 1);

//     const outPtr = Module._stringTestFunc(
//       textStringOnWasmHeap,
//       regexStringOnWasmHeap
//     );
//     console.log(outPtr);
//     return Module.UTF8ToString(outPtr);
//   };
// };

const match2 = (text, regex) =>
  new Promise((res) => {
    Module.onRuntimeInitialized = () => {
      var textStringOnWasmHeap = Module._malloc(text.length + 1);
      Module.stringToUTF8(text, textStringOnWasmHeap, text.length + 1);

      var regexStringOnWasmHeap = Module._malloc(regex.length + 1);
      Module.stringToUTF8(regex, regexStringOnWasmHeap, regex.length + 1);

      if (Module._boolTestFunc(textStringOnWasmHeap, regexStringOnWasmHeap)) {
        var outPtr = Module._stringTestFunc(
          textStringOnWasmHeap,
          regexStringOnWasmHeap
        );
        res(Module.UTF8ToString(outPtr));
      }
      res(null);
    };
  });

var text =
  '{"identity":{"__type":"Identity:ECP","DisplayName":"alak_e475b5dffb","RawIdentity":"160ed57b-b1c9-4c73-bffa-d6ca6c1131ad"},"properties":{"Parameters":{"__type":"JsonDictionaryOfanyType:#Microsoft.Exchange.Management.ControlPanel","GrantSendOnBehalfTo":[{"__type":"Identity:ECP","DisplayName":"Steven Miller","RawIdentity":"bf14ec48-1a36-4c7c-8b62-46ad87263df0"}],"EmailAddresses":["SIP:alak@veridinet.onmicrosoft.com2","SMTP:alak@veridinet.onmicrosoft.com","smtp:cgcngnngnxfn@veridinet.onmicrosoft.com","SPO:SPO_53bef9c4-baf5-4a18-8e9e-4b126ccff6e7@SPO_73f5d3eb-40ae-45bd-82b4-20a92a4187c7"]}}';
var regex = '"hui":"([^"]+)';

match2(text, regex).then(console.log);

// var text = '{"identity":{"__type":"Identity:ECP","DisplayName":"alak_e475b5dffb","RawIdentity":"160ed57b-b1c9-4c73-bffa-d6ca6c1131ad"},"properties":{"Parameters":{"__type":"JsonDictionaryOfanyType:#Microsoft.Exchange.Management.ControlPanel","GrantSendOnBehalfTo":[{"__type":"Identity:ECP","DisplayName":"Steven Miller","RawIdentity":"bf14ec48-1a36-4c7c-8b62-46ad87263df0"}],"EmailAddresses":["SIP:alak@veridinet.onmicrosoft.com2","SMTP:alak@veridinet.onmicrosoft.com","smtp:cgcngnngnxfn@veridinet.onmicrosoft.com","SPO:SPO_53bef9c4-baf5-4a18-8e9e-4b126ccff6e7@SPO_73f5d3eb-40ae-45bd-82b4-20a92a4187c7"]}}';

//  console.log(match(text, '"DisplayName":"([^"]+)'))

// my_test.cc
// Module.onRuntimeInitialized = () => { //Its like main() function
//     var text = '{"identity":{"__type":"Identity:ECP","DisplayName":"alak_e475b5dffb","RawIdentity":"160ed57b-b1c9-4c73-bffa-d6ca6c1131ad"},"properties":{"Parameters":{"__type":"JsonDictionaryOfanyType:#Microsoft.Exchange.Management.ControlPanel","GrantSendOnBehalfTo":[{"__type":"Identity:ECP","DisplayName":"Steven Miller","RawIdentity":"bf14ec48-1a36-4c7c-8b62-46ad87263df0"}],"EmailAddresses":["SIP:alak@veridinet.onmicrosoft.com2","SMTP:alak@veridinet.onmicrosoft.com","smtp:cgcngnngnxfn@veridinet.onmicrosoft.com","SPO:SPO_53bef9c4-baf5-4a18-8e9e-4b126ccff6e7@SPO_73f5d3eb-40ae-45bd-82b4-20a92a4187c7"]}}';

//     var textStringOnWasmHeap = Module._malloc((text.length+1));
//     Module.stringToUTF8(text, textStringOnWasmHeap, (text.length+1));
//     console.log(textStringOnWasmHeap);

//     var regex = '"DisplayName":"([^"]+)'

//     var regexStringOnWasmHeap = Module._malloc((regex.length+1));
//     Module.stringToUTF8(regex, regexStringOnWasmHeap, (regex.length+1));
//     console.log(regexStringOnWasmHeap);

//     console.log(Module._boolTestFunc(textStringOnWasmHeap, regexStringOnWasmHeap))
//     var outPtr = Module._stringTestFunc(textStringOnWasmHeap, regexStringOnWasmHeap)
//     console.log(outPtr)
//     console.log(Module.UTF8ToString(outPtr))

// }
