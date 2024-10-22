#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

program
  .version('1.0.0')
  .description('CLI for installing tac-form components');

program
  .command('add')
  .description('Add tac-form components to your project')
  .option('-y, --yes', 'Skip prompts and use default options')
  .action(async (options) => {
    let installPath = 'src/components/forms';

    if (!options.yes) {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'installPath',
          message: 'Where do you want to install the components?',
          default: installPath
        }
      ]);
      installPath = answers.installPath;
    }

    const sourcePath = path.join(__dirname, 'src');
    const destinationPath = path.join(process.cwd(), installPath);

    try {
      await fs.copy(sourcePath, destinationPath);
      console.log(chalk.green(`✔ tac-form components installed successfully in ${destinationPath}`));
    } catch (err) {
      console.error(chalk.red('Error installing components:'), err);
    }
  });

program.parse(process.argv);
