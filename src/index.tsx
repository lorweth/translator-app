import App from 'src/app';
import { loadIcon } from './configs/icon-loaders';
import getStore from './configs/store';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// Get store
const store = getStore();

// Load the icons
loadIcon();

// Render UI
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
