const { match, check } = require("../re2");

(async () => {
  const text =
    '{"identity":{"__type":"Identity:ECP","DisplayName":"abak_e475b5d","RawIdentity":"160ed57b-b1c-bffa-d6ca6c1131ad"},"properties":{"Parameters":{"__type":"JsonDictionaryOfanyType:#Microsoft.Exchange.Management.ControlPanel","GrantSendOnBehalfTo":[{"__type":"Identity:ECP","DisplayName":"Steven","RawIdentity":"bf14ec4d87263df0"}],"EmailAddresses":["SIP:abak@ver.com2","SMTP:abak@ve.com","smtp:cgcninet.com","SPO:SPO_53bef9c4-baf5-4a18-8e9e-4ba4187c7"]}}';
  const regex = '"DisplayName":"([^"]+)';
  const bool = await check(text, regex);
  console.log(bool);
  const str = await match(text, regex);
  console.log(str);
})();
