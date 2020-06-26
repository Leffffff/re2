import { RE2 } from '../scripts/re2';

((): void => {
  const text =
    // '{"ns_map": {"7092929680": 1581504899726338}, "added": [], "mount_points": {}, "moved": [], "bolt_data": [{"bolt_token": "B/LhnVWRP2JnUW2yLt2eMUBIaVQNwv10B9+fBxi9wfsS54SXUVII5yB/tjE/TdBhEpa/ja0v/WT67qpbliQcu5V66e4MyoPlzU7vuieCd2xwB/hTpctj4ydOu3LDatK7IrQ=", "bolt_unique_id": "7092929680", "latest_sjid": 1581504899726338}], "parent_changes": {"old_fq_path": null, "new_fq_path": null, "change_type": null, "is_changing_view": null, "change_to_fq_path": null}, "removed": ["/123testFolder"]}';
    `{"identity":{"__type":"Identity:ECP","User":"taina_twelve","RawIdentity":"160ed57b-b1c-b160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c--b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131adffa-d6ca6c1131ad"},"properties":{"Parameters":{"__type":"JsonDictionaryOfanyType:#Microsoft.Exchange.Management.ControlPanel","GrantSendOnBehalfTo":[{"__type":"Identity:ECP","DisplayName":"Steven","RawIdentity":"bf14ec4d87263df0"}],"EmailAddresses":["SIP:abak@ver.com2","SMTP:abak@ve.com","smtp:cgcninet.com","SPO:SPO_53bef9c4-baf5-4a18-8e9e-4ba4187c7"]}}{"identity":{"__type":"Identity:ECP","RawIdentity":"taina_twelve","RawIdentity":"160ed57b-b1c-b160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c--b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131ad160ed57b-b1c-bffa-d6ca6c1131adffa-d6ca6c1131ad"},"properties":{"Parameters":{"__type":"JsonDictionaryOfanyType:#Microsoft.Exchange.Management.ControlPanel","GrantSendOnBehalfTo":[{"__type":"Identity:ECP","DisplayName":"Steven","User":"bf14ec4d87263df0","RawIdentity":"aaa (1) (1).txt"}],"EmailAddresses":["SIP:abak@ver.com2","SMTP:abak@ve.com","smtp:cgcninet.com","SPO:SPO_53bef9c4-baf5-4a18-8e9e-4ba4187c7"]}}
    // `;
  // '/p/thumb/AAt5fPx4gUQkQ_kc-8ZEiyxwrQqdn-HTKq1wdVkI9RNOUtqsvMmLaBkzmQVR8q5lht6IJgMR0_MIOnWND87ttldfsdZLeiuo4asvCShEnsSK5NYt792f5DmLKnkyyLPqZRyppsF8aJS5L3jh-dWbEcuGWPSBy-I6C1A27vDMqVvSsoIKVbiwOGOKsdJAfyOZrkfpMjGzPLlZe5pbEhne5oolPuf8MRTpZL4gV4H88XSZXFg2H7-oLq99ESq6-26ROdBQw5QrGmGO73AMyoFaOR7bDlcxmImX5uRG0-Q8Qnjgo1Ujho-smq6WIB_3pLkxqzXgTWTnYUPr9wn4uioSJWd-y43VClYPdDUCFd3UIY6nR8vLLwKlTUdnvsYk9AGYp5Imkwe_VHznpJcswYQmJhx-/p.png';

  // const regex = '/p/(?:pdf|thumb)(?:_txt|thumb.+?size=|/)'; // '"(.+?)": "(.+?)"'; // '/p/(?:pdf|thumb)(?:_txt|thumb.+?size=|/)'; // '"(.+?)": "(.+?)"'; // '"(?i)u(?-i)ser":"([^"]+).+?(?i)rawIdentity":"([^"]+)(?-i)'; //.+?RawIdentity":"(?:[^"]+)
  const regex = '"(?i)u(?-i)ser":"([^"]*).+?(?i)rawIdentity":"([^"]+)(?-i)';
  const re = new RE2(regex, 'g');

  // standart
  const isMatch = new RE2(regex, 'g').test(text);
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
  console.log(
    'INFO: numberOfCaptureGroups -> ',
    new RE2(
      `(?:%2[27]|['"])(?:qwe)(?:%2[27]|['"])(?:%3A|:)(?:\\+|\\s)*(?:(?:%2[27]|['"])(.+?)(?:%2[27]|['"])|(.+?)(?:[,}\\]]|%2C|%[75]D))`
    ).numberOfCaptureGroups()
  );

  // // undefined
  // const isMatchUndef = new RE2((undefined as unknown) as string, 'g').test(
  //   text
  // );
  // console.log('INFO: test RE2(undef) -> ', isMatchUndef);

  // const matchedUndef = new RE2(regex, 'g').exec(
  //   (undefined as unknown) as string
  // );
  // console.log('INFO: exec RE2(undef) -> ', matchedUndef);

  // // undefined with undefined
  // const isMatchUndef1 = new RE2((undefined as unknown) as string, 'g').test(
  //   (undefined as unknown) as string
  // );
  // console.log('INFO: test RE2(undef) with str undefined -> ', isMatchUndef1);

  // const matchedUndef1 = new RE2((undefined as unknown) as string, 'g').exec(
  //   (undefined as unknown) as string
  // );
  // console.log('INFO: exec RE2(undef) with str undefined -> ', matchedUndef1);

  // // null
  // const isMatchNull = new RE2((null as unknown) as string, 'g').test(text);
  // console.log('INFO: test RE2(null) -> ', isMatchNull);

  // const matchedNull = new RE2(regex, 'g').exec((null as unknown) as string);
  // console.log('INFO: exec RE2(null) -> ', matchedNull);

  // // null with null
  // const isMatchNull1 = new RE2((null as unknown) as string, 'g').test(
  //   (null as unknown) as string
  // );
  // console.log('INFO: test RE2(null) with str null -> ', isMatchNull1);

  // const matchedNull1 = new RE2((null as unknown) as string, 'g').exec(
  //   (null as unknown) as string
  // );
  // console.log('INFO: exec RE2(null) with str null -> ', matchedNull1);
})();
