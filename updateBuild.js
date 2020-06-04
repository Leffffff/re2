const {
  readdirSync,
  unlinkSync,
  readFile,
  writeFileSync,
  copyFileSync
} = require('fs');


const cleanUp = folder =>
  readdirSync(folder).forEach(file =>
    unlinkSync(`${folder}${file}`));

const isUsefullFile = file =>
  (file.endsWith('.cc') || file.endsWith('.h')) &&
  (!file.startsWith('test') && !file.startsWith('fuzz'));

const copyFiles = (folder, targetDirs) =>
  targetDirs.forEach(dir => readdirSync(dir).forEach(file => {
    if (isUsefullFile(file))
      copyFileSync(`${dir}${file}`, `${folder}${file}`);
  }));

const updateIncludes = folder =>
  readdirSync(folder).forEach(file =>
    readFile(`${folder}${file}`, 'utf8', (err, data) => {
      if (err)
        return console.log(err);
      const result = data.replace(/#include "(?:re2|util)\//g, '#include "');
      writeFileSync(`${folder}${file}`, result, 'utf8');
    })
  );


(() => {
  const targetDirs = ['google-re2/re2/', 'google-re2/util/'];
  const folder = './src/';
  cleanUp(folder);
  copyFiles(folder, targetDirs);
  updateIncludes(folder);
})()