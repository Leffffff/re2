import { strict } from 'assert';
import { RE2 } from '../scripts/re2';
((): void => {
  console.log("test 1")
  const reExec1 = new RE2('(?i)quick\\s(brown).+?(jumps)', 'g');
  const resultExec1 = reExec1.exec(
    'The Quick Brown Fox Jumps Over The Lazy Dog'
  );
  strict.equal(resultExec1[0][0], 'Quick Brown Fox Jumps');
  strict.equal(resultExec1[0][1], 'Brown');
  strict.equal(resultExec1[0][2], 'Jumps');
  console.log(resultExec1);

  console.log("test 2")
  const reExec2 = new RE2('(ab*)', 'g');
  const resultExec2 = reExec2.exec('abbcdefabh');
  strict.equal(resultExec2[0][0], 'abb'); 
  strict.equal(resultExec2[0][1], 'abb');
  strict.equal(resultExec2[1][0], 'ab');
  strict.equal(resultExec2[1][1], 'ab');
  console.log(resultExec2);

  console.log("test 3")
  const reExec3 = new RE2('(hello \\S+)');
  const resultExec3 = reExec3.exec('This is a hello world!');
  strict.equal(resultExec3[0][0], 'hello world!');
  strict.equal(resultExec3[0][1], 'hello world!');
  console.log(resultExec3);

  // //additional test 
  // const reExec4 = new RE2(`(?:%2[27]|['"])(?:qwe)(?:%2[27]|['"])(?:%3A|:)(?:\\+|\\s)*(?:(?:%2[27]|['"])(.+?)(?:%2[27]|['"])|(.+?)(?:[,}\\]]|%2C|%[75]D))`);
  // const resultExec4 = reExec4.numberOfCaptureGroups();
  // strict.equal(resultExec4, 3);

  console.log("test 4")
  const reExec4 = new RE2('"DisplayName":"([^"]+).+?"RawIdentity":"(.+?)"');
  const resultExec4 = reExec4.exec('{"identity":{"__type":"Identity:ECP","DisplayName":"taina_twelve","RawIdentity":"160ed57b-b1c-b160ed57b-b1c-bffa-d6ca6c113"}');
  strict.equal(resultExec4[0][0], '"DisplayName":"taina_twelve","RawIdentity":"160ed57b-b1c-b160ed57b-b1c-bffa-d6ca6c113"');
  strict.equal(resultExec4[0][1], 'taina_twelve');
  strict.equal(resultExec4[0][2], '160ed57b-b1c-b160ed57b-b1c-bffa-d6ca6c113');
  console.log(resultExec4);

  console.log("test 5") 
  const reExec5 = new RE2('^(hello)', 'g');
  const resultExec5 = reExec5.exec('hellohello');
  strict.equal(resultExec5[0][0], 'hello');
  strict.equal(resultExec5[0][1], 'hello');
  console.log(resultExec5);

  console.log("test 6")
  const reExec6 = new RE2('');
  const resultExec6 = reExec6.exec('something something');
  strict.equal(resultExec6[0][0].length, 0);
  console.log(resultExec6[0][0].length) 

  console.log("test 7") 
  const reExec7 = new RE2('(b|^a)', 'g');
  const resultExec7 = reExec7.exec('aabc');
  strict.equal(resultExec7[0][0], 'a');
  strict.equal(resultExec7[0][1], 'a');
  strict.equal(resultExec7[1][0], 'b');
  strict.equal(resultExec7[1][1], 'b');
  console.log(resultExec7);

  console.log("test 8")
  const reExec8 = new RE2('(?:^a)', 'g');
  const resultExec8 = reExec8.exec('aabc');
  strict.equal(resultExec8[0][0], 'a');
  console.log(resultExec8)

  console.log("test 9")
  const reExec9 = new RE2('(?i)hunter\\s(wants).+?(where)');
  const resultExec9 = reExec9.exec(
    'Every Hunter Wants to Know Where the Pheasant Sits'
  );
  strict.equal(resultExec9[0][0], 'Hunter Wants to Know Where');
  strict.equal(resultExec9[0][1], 'Wants');
  strict.equal(resultExec9[0][2], 'Where');
  console.log(resultExec9);

  console.log("test 10")
  const reExec10 = new RE2(undefined as unknown as string) ;
  const resultExec10 = reExec10.exec(
    'Every Hunter Wants to Know Where the Pheasant Sits'
  );
  strict.equal(resultExec10[0][0], '');
  console.log(resultExec10);
  
  console.log("test 11")
  const reExec11 = new RE2('(?i)hunter\\s(wants).+?(where)') ;
  const resultExec11 = reExec11.exec(undefined as unknown as string);
  strict.equal(resultExec11[0][0] && resultExec11[0][1] && resultExec11[0][2], '');
  console.log(resultExec11);

  console.log("test 12")
  const reExec12 = new RE2(undefined as unknown as string) ;
  const resultExec12 = reExec12.exec(undefined as unknown as string);
  strict.equal(resultExec12[0][0], '');
  console.log(resultExec12);

  console.log("test 13")
  const reExec13 = new RE2('') ;
  const resultExec13 = reExec13.exec('asdfghjkl;zxcvbnm123456789');
  strict.equal(resultExec13[0][0], '');
  console.log(resultExec13);
  
})();
