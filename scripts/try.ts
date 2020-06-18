// import { resolve } from 'path';
// import {
//   execFunction,
//   globalExec,
//   replaceFunction,
//   testFunction,
// } from './reFunctions';
// import { getPointers, validation } from './utils';

// const Module = require('../../re2Lib');

// const re = (regex: string, flag: string) => {
//   Module.wasmBinary = resolve(__dirname, '../../re2Lib.wasm');
//   // console.log('INFO: re -> Module.wasmBinary', Module.wasmBinary);
//   Module.noExitRuntime = true;
//   return Module({
//     onRuntimeInitialized: () => {
//       const re2 = Module();
//       validation(re2, regex);
//       return {
//         numberOfCaptureGroups: (): number => {
//           const [regexPointer] = getPointers(re2, regex);
//           return re2._getNumberOfCapturingGroups(regexPointer);
//         },

//         test: (text: string): boolean => testFunction(re2, text, regex),

//         exec: (text: string): string[] | string[][] | null =>
//           flag === 'g'
//             ? globalExec(re2, text, regex)
//             : execFunction(re2, text, regex),

//         replace: (baseText: string, rewrite: string): string =>
//           replaceFunction({
//             module: re2,
//             baseText,
//             regex,
//             rewrite,
//             flag: flag || '',
//           }),
//       };
//     },
//   });
// };

// (() => {
//   const text = `{"identity":{"__type":"Identity:ECP","HUigovno":"taina_twelve","RawIdentity":"160ed57b-b1c-b160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c--b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131adffa-d6ca6c1131ad"},"properties":{"Parameters":{"__type":"JsonDictionaryOfanyType:#Microsoft.Exchange.Management.ControlPanel","GrantSendOnBehalfTo":[{"__type":"Identity:ECP","DisplayName":"Steven","RawIdentity":"bf14ec4d87263df0"}],"EmailAddresses":["SIP:abak@ver.com2","SMTP:abak@ve.com","smtp:cgcninet.com","SPO:SPO_53bef9c4-baf5-4a18-8e9e-4ba4187c7"]}}{"identity":{"__type":"Identity:ECP","RawIdentity":"taina_twelve","RawIdentity":"160ed57b-b1c-b160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c--b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131adffa-d6ca6c1131ad"},"properties":{"Parameters":{"__type":"JsonDictionaryOfanyType:#Microsoft.Exchange.Management.ControlPanel","GrantSendOnBehalfTo":[{"__type":"Identity:ECP","DisplayName":"Steven","HUigovno":"bf14ec4d87263df0","RawIdentity":"qwe"}],"EmailAddresses":["SIP:abak@ver.com2","SMTP:abak@ve.com","smtp:cgcninet.com","SPO:SPO_53bef9c4-baf5-4a18-8e9e-4ba4187c7"]}}
//   `;

//   const regex = '"HUigovno":"([^"]+).+?RawIdentity":"([^"]+)';

//   const refun = re(regex, 'g')();
//   console.log('INFO: RE2', refun);

//   const isMatch = refun.test(text);
//   console.log('INFO: isMatch', isMatch);
// })();

// throws TypeError: Cannot set property wasmBinary of #<Object> which has only a getter

import {
  execFunction,
  globalExec,
  replaceFunction,
  testFunction,
} from './reFunctions';
import { getPointers, validate } from './utils';

const Module = require('../../re2Lib');

const re = (regex: string, flag: string) => {
  Module.onRuntimeInitialized = () => {
    validate(Module, regex);
    return {
      numberOfCaptureGroups: (): number => {
        const [regexPointer] = getPointers(Module, regex);
        return Module._getNumberOfCapturingGroups(regexPointer);
      },

      test: (text: string): boolean => testFunction(Module, text, regex),

      exec: (text: string): string[] | string[][] | null =>
        flag === 'g'
          ? globalExec(Module, text, regex)
          : execFunction(Module, text, regex),

      replace: (baseText: string, rewrite: string): string =>
        replaceFunction({
          module: Module,
          baseText,
          regex,
          rewrite,
          flag: flag || '',
        }),
    };
  };
  return Module.onRuntimeInitialized();
};

(() => {
  const text = `{"identity":{"__type":"Identity:ECP","HUigovno":"taina_twelve","RawIdentity":"160ed57b-b1c-b160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c--b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131adffa-d6ca6c1131ad"},"properties":{"Parameters":{"__type":"JsonDictionaryOfanyType:#Microsoft.Exchange.Management.ControlPanel","GrantSendOnBehalfTo":[{"__type":"Identity:ECP","DisplayName":"Steven","RawIdentity":"bf14ec4d87263df0"}],"EmailAddresses":["SIP:abak@ver.com2","SMTP:abak@ve.com","smtp:cgcninet.com","SPO:SPO_53bef9c4-baf5-4a18-8e9e-4ba4187c7"]}}{"identity":{"__type":"Identity:ECP","RawIdentity":"taina_twelve","RawIdentity":"160ed57b-b1c-b160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c--b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131adffa-d6ca6c1131ad"},"properties":{"Parameters":{"__type":"JsonDictionaryOfanyType:#Microsoft.Exchange.Management.ControlPanel","GrantSendOnBehalfTo":[{"__type":"Identity:ECP","DisplayName":"Steven","HUigovno":"bf14ec4d87263df0","RawIdentity":"qwe"}],"EmailAddresses":["SIP:abak@ver.com2","SMTP:abak@ve.com","smtp:cgcninet.com","SPO:SPO_53bef9c4-baf5-4a18-8e9e-4ba4187c7"]}}
  `;

  const regex = '"HUigovno":"([^"]+).+?RawIdentity":"([^"]+)';

  const refun = re(regex, 'g');
  console.log('INFO: RE2', refun);

  const isMatch = refun.test(text);
  console.log('INFO: isMatch', isMatch);

  const n = refun.numberOfCaptureGroups();
  console.log('INFO: numberOfCaptureGroups -> ', n);

  const qwe = re(regex, 'g');
  console.log('INFO: RE2', qwe);

  const isMatch1 = qwe.test(text);
  console.log('INFO: isMatch1', isMatch1);

  const num = qwe.numberOfCaptureGroups();
  console.log('INFO: numberOfCaptureGroups -> ', num);
})();
