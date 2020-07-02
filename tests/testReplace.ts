import { strict } from 'assert';
import { RE2 } from '../scripts/re2';
((): void => {
  console.log('test 1');
  const reReplace1 = new RE2('(?i)apples', 'g');
  const resultReplace1 = reReplace1.replace(
    'Apples are round, and apples are juicy.',
    'oranges'
  );
  strict.equal(resultReplace1, 'oranges are round, and oranges are juicy.');
  console.log(resultReplace1);

  console.log('test 2');
  const reReplace2 = new RE2('(?i)xmas');
  const resultReplace2 = reReplace2.replace(
    'Twas the night before Xmas...',
    'Christmas'
  );
  strict.equal(resultReplace2, 'Twas the night before Christmas...');
  console.log(resultReplace2);

  console.log('test 3');
  const reReplace3 = new RE2('(\\w+)\\s(\\w+)');
  const resultReplace3 = reReplace3.replace('John Smith', '\\2, \\1');
  strict.equal(resultReplace3, 'Smith, John');
  console.log(resultReplace3);

  console.log('test 4');
  const reReplace4 = new RE2('([^\\d]*)(\\d*)([^\\w]*)');
  const p1 = '\\1';
  const p2 = '\\2';
  const p3 = '\\3';
  const resultReplace4 = reReplace4.replace(
    'abc12345#$*%',
    [p1, p2, p3].join(' - ')
  );
  strict.equal(resultReplace4, 'abc - 12345 - #$*%');
  console.log(resultReplace4);

  console.log('test 5');
  const textReplace5 =
    'yabba& dabba &doo yabba& dabba &doo yabba& dabba &doo yabba& dabba &doo yabba& dabba &doo';
  const reReplace5 = new RE2('(\\w+?)&.+?&(\\w+)', 'g');
  const resultReplace5 = reReplace5.replace(textReplace5, '\\2 \\1');
  strict.equal(
    resultReplace5,
    'doo yabba doo yabba doo yabba doo yabba doo yabba'
  );
  console.log(resultReplace5);

  console.log('test 6');
  const textReplace6 = (undefined as unknown) as string;
  const reReplace6 = new RE2('(\\w+?)&.+?&(\\w+)', 'g');
  const resultReplace6 = reReplace6.replace(textReplace6, '\\2 \\1');
  // strict.equal(
  //   resultReplace6,
  //   'doo yabba doo yabba doo yabba doo yabba doo yabba'
  // );
  console.log(resultReplace6);

  console.log('test 7');
  const textReplace7 =
    'yabba& dabba &doo yabba& dabba &doo yabba& dabba &doo yabba& dabba &doo yabba& dabba &doo';
  const reReplace7 = new RE2((undefined as unknown) as string, 'g');
  const resultReplace7 = reReplace7.replace(textReplace7, '\\2 \\1');
  // strict.equal(
  //   resultReplace7,
  //   'doo yabba doo yabba doo yabba doo yabba doo yabba'
  // );
  console.log(resultReplace7);

  console.log('test 8');
  const textReplace8 =
    'yabba& dabba &doo yabba& dabba &doo yabba& dabba &doo yabba& dabba &doo yabba& dabba &doo';
  const reReplace8 = new RE2('(\\w+?)&.+?&(\\w+)', 'g');
  const resultReplace8 = reReplace8.replace(
    textReplace8,
    (undefined as unknown) as string
  );
  // strict.equal(
  //   resultReplace8,
  //   'doo yabba doo yabba doo yabba doo yabba doo yabba'
  // );
  console.log(resultReplace8);

  console.log('test 9');
  const textReplace9 = (undefined as unknown) as string;
  const reReplace9 = new RE2((undefined as unknown) as string, 'g');
  const resultReplace9 = reReplace9.replace(
    textReplace9,
    (undefined as unknown) as string
  );
  // strict.equal(
  //   resultReplace9,
  //   'doo yabba doo yabba doo yabba doo yabba doo yabba'
  // );
  console.log(resultReplace9);

  console.log('test 10');
  const textReplace10 = (null as unknown) as string;
  const reReplace10 = new RE2('(\\w+?)&.+?&(\\w+)', 'g');
  const resultReplace10 = reReplace10.replace(textReplace10, '\\2 \\1');
  // strict.equal(
  //   resultReplace10,
  //   'doo yabba doo yabba doo yabba doo yabba doo yabba'
  // );
  console.log(resultReplace10);

  console.log('test 11');
  const textReplace11 =
    'yabba& dabba &doo yabba& dabba &doo yabba& dabba &doo yabba& dabba &doo yabba& dabba &doo';
  const reReplace11 = new RE2((null as unknown) as string, 'g');
  const resultReplace11 = reReplace11.replace(textReplace11, '\\2 \\1');
  // strict.equal(
  //   resultReplace11,
  //   'doo yabba doo yabba doo yabba doo yabba doo yabba'
  // );
  console.log(resultReplace11);

  console.log('test 12');
  const textReplace12 =
    'yabba& dabba &doo yabba& dabba &doo yabba& dabba &doo yabba& dabba &doo yabba& dabba &doo';
  const reReplace12 = new RE2('(\\w+?)&.+?&(\\w+)', 'g');
  const resultReplace12 = reReplace12.replace(
    textReplace12,
    (null as unknown) as string
  );
  // strict.equal(
  //   resultReplace12,
  //   'doo yabba doo yabba doo yabba doo yabba doo yabba'
  // );
  console.log(resultReplace12);

  console.log('test 13');
  const textReplace13 = (null as unknown) as string;
  const reReplace13 = new RE2((null as unknown) as string, 'g');
  const resultReplace13 = reReplace13.replace(
    textReplace13,
    (null as unknown) as string
  );
  // strict.equal(
  //   resultReplace13,
  //   'doo yabba doo yabba doo yabba doo yabba doo yabba'
  // );
  console.log(resultReplace13);
})();
