import { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  // ...
  // framework: '@storybook/react-webpack5', 👈 Remove this
  framework: '@storybook/nextjs', // 👈 Add this
};

export default config;