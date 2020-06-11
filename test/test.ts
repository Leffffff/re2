import { RE2 } from '../scripts/re2';

(async (): Promise<void> => {
  const text =
    '{"identity":{"__type":"Identity:ECP","DisplayName":"11111111111D,"RawIdentity":"160ed57b-b1c-b160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131adffa-d6ca6c1131ad"},"properties":{"Parameters":{"__type":"JsonDictionaryOfanyType:#Microsoft.Exchange.Management.ControlPanel","GrantSendOnBehalfTo":[{"__type":"Identity:ECP","DisplayName":"Steven","RawIdentity":"bf14ec4d87263df0"}],"EmailAddresses":["SIP:abak@ver.com2","SMTP:abak@ve.com","smtp:cgcninet.com","SPO:SPO_53bef9c4-baf5-4a18-8e9e-4ba4187c7"]}}';


  const regex = '"DisplayName":"([^,]+).+?"RawIdentity":"([^"]+)(.+)'; // strange thing happens when adding at the end (.+) -> abak_e475b5d끀 
  const re = new RE2(regex);

  
  // const re2 = new RE2('(\\w+?)&.+?&(\\w+)');
  // const text2 = 'yabba& dabba &doo yabba& dabba &doo yabba& dabba &doo yabba& dabba &doo yabba& dabba &doo';
  // const repl = await RE2.replace(text2, '(\\w+?)&.+?&(\\w+)', '\\2 \\1', 'g');
  // console.log('repl', repl);

  // const js = new RegExp(regex);
  // const qwe = js.exec(text);
  // console.log('INFO: qwe', qwe);

  // const regex = '( (.) | (.) | (.+))';
  // const re2 = new RE2(regex);
  // console.log(await re2.numberOfCaptureGroups());

  // const isMatch = await re.test(text);
  // console.log('INFO: isMatch', isMatch);

  // const string =
  // await re.exec(text); // single match
  // console.log('INFO: string', string);

  const matched =
  await re.match(text);
  console.log(matched);
})();
