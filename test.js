const { match, check } = require("./re2");

(async () => {
  const text =
    '{"identity":{"__type":"Identity:ECP","DisplayName":"alak_e475b5dffb","RawIdentity":"160ed57b-b1c9-4c73-bffa-d6ca6c1131ad"},"properties":{"Parameters":{"__type":"JsonDictionaryOfanyType:#Microsoft.Exchange.Management.ControlPanel","GrantSendOnBehalfTo":[{"__type":"Identity:ECP","DisplayName":"Steven Miller","RawIdentity":"bf14ec48-1a36-4c7c-8b62-46ad87263df0"}],"EmailAddresses":["SIP:alak@veridinet.onmicrosoft.com2","SMTP:alak@veridinet.onmicrosoft.com","smtp:cgcngnngnxfn@veridinet.onmicrosoft.com","SPO:SPO_53bef9c4-baf5-4a18-8e9e-4b126ccff6e7@SPO_73f5d3eb-40ae-45bd-82b4-20a92a4187c7"]}}';
  const regex = '"DisplayName":"([^"]+)';
  const bool = await check(text, regex);
  console.log(bool);
  const str = await match(text, regex);
  console.log(str);
})();
