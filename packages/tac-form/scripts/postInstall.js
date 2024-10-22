const { execSync } = require('child_process');
const path = require('path');

console.log('Running tac-form CLI for initial setup...');
try {
  execSync(`node ${path.join(__dirname, '../cli.js')} add --yes`, { stdio: 'inherit' });
} catch (error) {
  console.error('Error running tac-form CLI:', error);
}
