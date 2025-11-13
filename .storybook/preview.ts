import '../src/styles/globals.css';
import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        date: /Date$/,
        color: /(background|color)$/i,
      },
    },
  },
};

export default preview;
