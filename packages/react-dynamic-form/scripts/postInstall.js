const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const srcDir = path.join(__dirname, '../src');
const targetDir = path.join(process.cwd(), 'src/components/form');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  fs.readdirSync(src).forEach(file => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    if (fs.lstatSync(srcFile).isDirectory()) {
      copyDir(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
      console.log(chalk.green(`Copied ${file} to ${dest}`));
    }
  });
}

console.log(chalk.blue(`Installing form components to ${targetDir}...`));
copyDir(srcDir, targetDir);
console.log(chalk.green('Form components installed successfully!'));
