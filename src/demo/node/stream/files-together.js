/**
 * 将多个文件合并成一个
 */
const fs = require('fs');
const path = require('path');

const IGNORE_FILES = ['.DS_Store']

function streamTogether(sourcePath, targetPath, cb) {
  const fragmentFiles = fs.readdirSync(path.resolve(__dirname, sourcePath)).filter(f => !IGNORE_FILES.includes(f))
  console.log('Source files', fragmentFiles);
  const writeStream = fs.createWriteStream(path.resolve(__dirname, targetPath));

  streamRecursive(fragmentFiles, writeStream, sourcePath, cb);
}

function streamRecursive(fFiles, wStream, sourcePath, cb) {
  if (!fFiles.length) {
    wStream.end();
    cb();
    return;
  }

  const curPath = fFiles.shift();
  const curFile = path.resolve(__dirname, sourcePath, curPath);
  const curReadStream = fs.createReadStream(curFile);

  curReadStream.pipe(wStream, { end: false });

  curReadStream.on('end', () => {
    streamRecursive(fFiles, wStream, sourcePath, cb);
  });

  curReadStream.on('error', err => {
    console.error('error:', err);
    wStream.close();
  });
}

/**
 * Import:
 * fragment_files:
 * test1.txt: text1
 * test2.txt: text2
 * test3.txt: text3
 * 
 * Output:
 * target.txt: text1text2text3
 */

streamTogether('fragment_files', 'target.txt', () => {
  const target = fs.readFileSync('target.txt', 'utf8');
  console.log('Target Content:', target);
});