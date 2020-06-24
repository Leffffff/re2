import { RE2 } from '../scripts/re2';

((): void => {
  const text =
    '{"ns_map": {"7092929680": 1581504899726338}, "added": [], "mount_points": {}, "moved": [], "bolt_data": [{"bolt_token": "B/LhnVWRP2JnUW2yLt2eMUBIaVQNwv10B9+fBxi9wfsS54SXUVII5yB/tjE/TdBhEpa/ja0v/WT67qpbliQcu5V66e4MyoPlzU7vuieCd2xwB/hTpctj4ydOu3LDatK7IrQ=", "bolt_unique_id": "7092929680", "latest_sjid": 1581504899726338}], "parent_changes": {"old_fq_path": null, "new_fq_path": null, "change_type": null, "is_changing_view": null, "change_to_fq_path": null}, "removed": ["/123testFolder"]}';
  //   `{"identity":{"__type":"Identity:ECP","User":"taina_twelve","RawIdentity":"160ed57b-b1c-b160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c--b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131adffa-d6ca6c1131ad"},"properties":{"Parameters":{"__type":"JsonDictionaryOfanyType:#Microsoft.Exchange.Management.ControlPanel","GrantSendOnBehalfTo":[{"__type":"Identity:ECP","DisplayName":"Steven","RawIdentity":"bf14ec4d87263df0"}],"EmailAddresses":["SIP:abak@ver.com2","SMTP:abak@ve.com","smtp:cgcninet.com","SPO:SPO_53bef9c4-baf5-4a18-8e9e-4ba4187c7"]}}{"identity":{"__type":"Identity:ECP","RawIdentity":"taina_twelve","RawIdentity":"160ed57b-b1c-b160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c--b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131adffa-d6ca6c1131ad"},"properties":{"Parameters":{"__type":"JsonDictionaryOfanyType:#Microsoft.Exchange.Management.ControlPanel","GrantSendOnBehalfTo":[{"__type":"Identity:ECP","DisplayName":"Steven","User":"bf14ec4d87263df0","RawIdentity":"aaa (1) (1).txt"}],"EmailAddresses":["SIP:abak@ver.com2","SMTP:abak@ve.com","smtp:cgcninet.com","SPO:SPO_53bef9c4-baf5-4a18-8e9e-4ba4187c7"]}}
  // `;

  const regex = '"(.+?)": "(.+?)"'; // '"(.+?)": "(.+?)"'; // '"(?i)u(?-i)ser":"([^"]+).+?(?i)rawIdentity":"([^"]+)(?-i)'; //.+?RawIdentity":"(?:[^"]+)

  const re = new RE2(regex, 'g');
  const re2 = new RE2((undefined as unknown) as string, 'g');

  const isMatch2 = re2.test(text);
  console.log('INFO: test -> ', isMatch2);

  const isMatch = re.test(text);
  console.log('INFO: test -> ', isMatch);

  const matched2 = re2.exec(text);
  console.log('INFO: exec -> ', matched2);

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
