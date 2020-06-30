
const Module = require("../../bin/re2Lib.js")

//my_test.cc
Module.onRuntimeInitialized = () => { //Its like main() function
    // var text = '{"identity":{"__type":"Identity:ECP","DisplayName":"alak_e_end","RawIdentity":"160ed57b-b1c9-4c73-bffa-d6ca6c1131adaa_huiasdjkgahdsgagds12371et7dgadggj21fjfyedjqg1fj2fjf3fjjdajh214jhjwdagh2gh1hg3g1j2gj3ggdasgkdgk1gk2gk3gk1ghk2kgkgjdgkjgk1gkkg2gk3gkgjkkhasadsca6c1131adaa_huiasdjkgahdsgagds12371et7dgadggj21fjfyedjqg1fj2fjf3fjjdajh214jhjwdagh2gh1hg3g1j2gj3ggdasgkdgk1gk2gk3gk1ghk2kgkgjdgkjgk1gkkg2gk3gkgjkkhasadsca6c1131adaa_huiasdjkgahdsgagds12371et7dgadggj21fjfyedjqg1fj2fjf3fjjdajh214jhjwdagh2gh1hg3g1j2gj3ggdasgkdgk1gk2gk3gk1ghk2kgkgjdgkjgk1gkkg2gk3gkgjkkhasadsadsaddsga31312421_end"},"properties":{"Parameters":{"__type":"JsonDictionaryOfanyType:#Microsoft.Exchange.Management.ControlPanel","GrantSendOnBehalfTo":[{"__type":"Identity:ECP","DisplayName":"Steven Miller","RawIdentity":"bf14ec48-1a36-4c7c-8b62-46ad87263df0"}],"EmailAddresses":["SIP:alak@veridinet.onmicrosoft.com","SMTP:alak@veridinet.onmicrosoft.com","smtp:cgcngnngnxfn@veridinet.onmicrosoft.com","SPO:SPO_53bef9c4-baf5-4a18-8e9e-4b126ccff6e7@SPO_73f5d3eb-40ae-45bd-82b4-20a92a4187c7"]}}{"identity":{"__type":"Identity:ECP","DisplayName":"alak_e_end","RawIdentity":"160ed57b-b1c9-4c73-bffa-d6ca6c1131adaa_huiasdjkgahdsgagds12371et7dgadggj21fjfyedjqg1fj2fjf3fjjdajh214jhjwdagh2gh1hg3g1j2gj3ggdasgkdgk1gk2gk3gk1ghk2kgkgjdgkjgk1gkkg2gk3gkgjkkhasadsca6c1131adaa_huiasdjkgahdsgagds12371et7dgadggj21fjfyedjqg1fj2fjf3fjjdajh214jhjwdagh2gh1hg3g1j2gj3ggdasgkdgk1gk2gk3gk1ghk2kgkgjdgkjgk1gkkg2gk3gkgjkkhasadsca6c1131adaa_huiasdjkgahdsgagds12371et7dgadggj21fjfyedjqg1fj2fjf3fjjdajh214jhjwdagh2gh1hg3g1j2gj3ggdasgkdgk1gk2gk3gk1ghk2kgkgjdgkjgk1gkkg2gk3gkgjkkhasadsadsaddsga31312421_end"},"properties":{"Parameters":{"__type":"JsonDictionaryOfanyType:#Microsoft.Exchange.Management.ControlPanel","GrantSendOnBehalfTo":[{"__type":"Identity:ECP","DisplayName":"Steven Miller","RawIdentity":"bf14ec48-1a36-4c7c-8b62-46ad87263df0"}],"EmailAddresses":["SIP:alak@veridinet.onmicrosoft.com","SMTP:alak@veridinet.onmicrosoft.com","smtp:cgcngnngnxfn@veridinet.onmicrosoft.com","SPO:SPO_53bef9c4-baf5-4a18-8e9e-4b126ccff6e7@SPO_73f5d3eb-40ae-45bd-82b4-20a92a4187c7"]}}';

    // var regex = '"DisplayName":"([^"]+).+?"RawIdentity":"([^"]+)'
    // // var regex = '"DisplayName":"([^"]+).+?"RawIdentity":"([^"]+).+?"SIP:([^"]+)"'

    var regex = '^(hello)';
    var text = 'hellohello';

    var textStringOnWasmHeap = Module._malloc((text.length+1));
    Module.stringToUTF8(text, textStringOnWasmHeap, (text.length+1));

    var regexStringOnWasmHeap = Module._malloc((regex.length+1));
    Module.stringToUTF8(regex, regexStringOnWasmHeap, (regex.length+1));

    var captureGroups = Module._getNumberOfCapturingGroups(regexStringOnWasmHeap);
    if (captureGroups < 0){
        console.log("captureGroups-ERROR");
    }

    var arrayPtr = Module._execNewSE(textStringOnWasmHeap, regexStringOnWasmHeap);
    if (arrayPtr === 0){
        console.log("arrayPtr-ERROR");
    }

    for (var i = 0; i < captureGroups; ++i){
        var stringPtr = Module._getStringPtrByIndex(arrayPtr, i);
        var string = Module.UTF8ToString(stringPtr);
        console.log('string');
        console.log(string);
        console.log('string');
    }
}


