import {
  copyFileSync,
  readdirSync,
  readFile,
  unlinkSync,
  writeFileSync,
} from 'fs';

const cleanUp = (folder: string): void =>
  readdirSync(folder).forEach(file => unlinkSync(`${folder}${file}`));

const isUsefullFile = (file: string): boolean =>
  (file.endsWith('.cc') || file.endsWith('.h')) &&
  !file.startsWith('test') &&
  !file.startsWith('fuzz');

const copyFiles = (folder: string, targetDirs: string[]): void =>
  targetDirs.forEach(dir =>
    readdirSync(dir).forEach(file => {
      if (isUsefullFile(file))
        copyFileSync(`${dir}${file}`, `${folder}${file}`);
    })
  );

const updateIncludes = (folder: string): void =>
  readdirSync(folder).forEach(file =>
    readFile(`${folder}${file}`, 'utf8', (err, data) => {
      if (err) return console.log(err);
      const regex = /#include "(?:re2|util)\//g;
      const result = data.replace(regex, '#include "');
      writeFileSync(`${folder}${file}`, result, 'utf8');
    })
  );

((): void => {
  const targetDirs = ['google-re2/re2/', 'google-re2/util/'];
  const folder = './src/';
  cleanUp(folder);
  copyFiles(folder, targetDirs);
  updateIncludes(folder);
})();
