const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');
const targetDir = path.join(process.cwd(), 'src/components/form-ui');

function copyFolder(src, dst) {
  fs.mkdirSync(dst, { recursive: true });

  const files = fs.readdirSync(src);

  files.forEach(file => {
    const srcFile = path.join(src, file);
    const dstFile = path.join(dst, file);

    const stat = fs.statSync(srcFile);
    if (stat.isDirectory()) {
      copyFolder(srcFile, dstFile);
    } else {
      fs.copyFileSync(srcFile, dstFile);
    }
  });
}

console.log(`Copying folder from ${srcDir} to ${targetDir}...`);
try {
  copyFolder(srcDir, targetDir);
  console.log('Folder copied successfully!');
} catch (error) {
  console.error(`Error during copy: ${error.message}`);
}