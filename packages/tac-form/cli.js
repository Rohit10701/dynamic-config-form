#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { execSync } = require('child_process'); 
program
  .version('1.0.0')
  .description('CLI for installing tac-form components');

program
  .command('add')
  .description('Add tac-form components to your project')
  .option('-y, --yes', 'Skip prompts and use default options')
  .action(async (options) => {
    let installPath = 'src/components/forms';
    let tailwindConfigPath = 'tailwind.config.ts'; // Default value
    let globalsCssPath = 'globals.css'; // Default value

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

      // New prompts for tailwind.config.ts and globals.css
      const configAnswers = await inquirer.prompt([
        {
          type: 'input',
          name: 'tailwindConfigPath',
          message: 'Where do you want to install tailwind.config.ts?',
          default: tailwindConfigPath
        },
        {
          type: 'input',
          name: 'globalsCssPath',
          message: 'Where do you want to install globals.css?',
          default: globalsCssPath
        }
      ]);
      tailwindConfigPath = configAnswers.tailwindConfigPath;
      globalsCssPath = configAnswers.globalsCssPath;
    }

    const sourcePath = path.join(__dirname, 'src');
    const destinationPath = path.join(process.cwd(), installPath);

    try {
      console.log(chalk.blue('Installing additional dependencies...'))
      execSync(
        `npm install @hookform/error-message class-variance-authority @hookform/resolvers clsx patch-package react-color react-datepicker react-hook-form react-phone-input-2 tailwind-merge zod`,
        { stdio: 'inherit' }
      );
      console.log(chalk.green('✔ Additional packages installed successfully.'));


      await fs.copy(sourcePath, destinationPath);
      // Copy tailwind.config.ts and globals.css
      await fs.copy(path.join(__dirname, 'tailwind.config.ts'), tailwindConfigPath);
      await fs.copy(path.join(__dirname, 'globals.css'), globalsCssPath);
      console.log(chalk.green(`✔ tac-form components installed successfully in ${destinationPath}`));
    } catch (err) {
      console.error(chalk.red('Error installing components:'), err);
    }
  });

program.parse(process.argv);
