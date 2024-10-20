const fs = require('fs-extra');
const { execSync } = require('child_process');
const path = require('path');

// Define paths
const sourceDir = path.join(__dirname, '..', 'patches'); // adjust as necessary
const sourceSrcDir = path.join(__dirname, '..', 'src'); // adjust as necessary
const targetDir = process.cwd();

// Function to copy folders
const copyFolder = (src, dest) => {
  fs.copySync(src, dest, { overwrite: true });
  console.log(`Copied ${src} to ${dest}`);
};

// Copy patches and src folders
copyFolder(sourceDir, path.join(targetDir, 'patches'));
copyFolder(sourceSrcDir, path.join(targetDir, 'src'));

// Install peer dependencies
const peerDeps = Object.keys(require(path.join(__dirname, '..', 'package.json')).peerDependencies);
if (peerDeps.length) {
  console.log('Installing peer dependencies...');
  execSync(`npm install ${peerDeps.join(' ')} --save-exact`, { stdio: 'inherit' });
}

// Apply patches if necessary
// Example: execSync('git apply patches/*.patch', { stdio: 'inherit' }); // adjust as needed
