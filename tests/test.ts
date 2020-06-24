import { RE2 } from '../scripts/re2';

((): void => {
  const text = `{"identity":{"__type":"Identity:ECP","User":"taina_twelve","RawIdentity":"160ed57b-b1c-b160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c--b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131adffa-d6ca6c1131ad"},"properties":{"Parameters":{"__type":"JsonDictionaryOfanyType:#Microsoft.Exchange.Management.ControlPanel","GrantSendOnBehalfTo":[{"__type":"Identity:ECP","DisplayName":"Steven","RawIdentity":"bf14ec4d87263df0"}],"EmailAddresses":["SIP:abak@ver.com2","SMTP:abak@ve.com","smtp:cgcninet.com","SPO:SPO_53bef9c4-baf5-4a18-8e9e-4ba4187c7"]}}{"identity":{"__type":"Identity:ECP","RawIdentity":"taina_twelve","RawIdentity":"160ed57b-b1c-b160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c--b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131adffa-d6ca6c1131ad"},"properties":{"Parameters":{"__type":"JsonDictionaryOfanyType:#Microsoft.Exchange.Management.ControlPanel","GrantSendOnBehalfTo":[{"__type":"Identity:ECP","DisplayName":"Steven","User":"bf14ec4d87263df0","RawIdentity":"aaa (1) (1).txt"}],"EmailAddresses":["SIP:abak@ver.com2","SMTP:abak@ve.com","smtp:cgcninet.com","SPO:SPO_53bef9c4-baf5-4a18-8e9e-4ba4187c7"]}}
  `;

  const regex = '"(?i)u(?-i)ser":"([^"]+).+?rawIdentity":"([^"]+)(?-i)'; //.+?RawIdentity":"(?:[^"]+)

  const re = new RE2(regex, 'g');

  const isMatch = re.test(text);
  console.log('INFO: test -> ', isMatch);

  const matched = re.exec(text);
  console.log('INFO: exec -> ', matched);

  const text2 =
    'yabba& dabba &doo yabba& dabba &doo yabba& dabba &doo yabba& dabba &doo yabba& dabba &doo';
  const reRepl = new RE2('^', 'g');
  console.log('INFO: replace -> ', reRepl.replace(text2, 'New string: '));

  const reRepl2 = new RE2('(\\w+?)&.+?&(\\w+)', 'g');
  console.log('INFO: replace -> ', reRepl2.replace(text2, '\\2 \\1'));

  const reRepl3 = new RE2('(\\w+?)&.+?&(\\w+)', 'g');
  console.log('INFO: replace -> ', reRepl3.replace(text2, '\\2 \\1'));

  const n = re.numberOfCaptureGroups();
  console.log('INFO: numberOfCaptureGroups -> ', n);


  
})();
