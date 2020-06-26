import { strict } from 'assert';
import { RE2 } from '../scripts/re2';
((): void => {
  //test 1
  const reExec1 = new RE2('(?i)quick\\s(brown).+?(jumps)', 'g');
  const resultExec1 = reExec1.exec(
    'The Quick Brown Fox Jumps Over The Lazy Dog'
  );
  strict.equal(resultExec1[0][0], 'Brown');
  strict.equal(resultExec1[0][1], 'Jumps');
  console.log(resultExec1);

  //test 2
  const reExec2 = new RE2('(ab*)', 'g');
  const resultExec2 = reExec2.exec('abbcdefabh');
  strict.equal(resultExec2[0][0], 'abb');
  strict.equal(resultExec2[1][0], 'ab');
  console.log(resultExec2);

  //test 3
  const reExec3 = new RE2('(hello \\S+)');
  const resultExec3 = reExec3.exec('This is a hello world!');
  strict.equal(resultExec3[0][0], 'hello world!');
  console.log(resultExec3);

  // //test 5 to do
  // const reExec5 = new RE2('^(hello)', 'g');
  // const resultExec5 = reExec5.exec('hellohello');
  // strict.equal(resultExec5[0][0], 'hello');
  // strict.equal(resultExec5[1][0], undefined);
  // console.log(resultExec5);

  // test 6
  const reExec6 = new RE2('');
  const resultExec6 = reExec6.exec('something something');
  strict.equal(resultExec6.length, 0);

  // //test 7 to do
  // const reExec7 = new RE2('(b|^a)', 'g');
  // const resultExec7 = reExec7.exec('aabc');
  // strict.equal(resultExec7[0][0], 'a');
  // strict.equal(resultExec7[1][0], 'b');
  // strict.equal(resultExec7[2][0], undefined);
  // console.log(resultExec7);

  //test 8
  const reExec8 = new RE2('(?:^a)', 'g');
  const resultExec8 = reExec8.exec('aabc');
  strict.equal(resultExec8.length, 0);

  //   //test 9
  //   const reExec9 = new RE2('(?i)охотник\\s(желает).+?(где)');
  //   const resultExec9 = reExec9.exec(
  //     'Каждый Охотник Желает Знать Где Сидит Фазан'
  //   );
  //   //   strict.equal(resultExec9[0][0], 'Желает');
  //   console.log(resultExec9);

  //test 9
  const reExec9 = new RE2('(?i)hunter\\s(wants).+?(where)');
  const resultExec9 = reExec9.exec(
    'Every Hunter Wants to Know Where the Pheasant Sits'
  );
  console.log(resultExec9);

  //   //test 10
  //   const reExec10 = new RE2('(аб*)', 'g');
  //   const resultExec10 = reExec10.exec('аббвгдеабё');
  //   strict.equal(resultExec10[0][0], 'абб');
  //   strict.equal(resultExec10[1][0], 'аб');
  //   strict.equal(resultExec10[2][0], null);
  //   console.log(resultExec10);
})();
