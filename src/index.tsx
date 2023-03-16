import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app-root';

const rootElement = document.querySelector('#root');

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(rootElement!);

root.render(<App />);
