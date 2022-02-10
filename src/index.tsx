import { loadIcon } from 'src/configs/icon-loaders';
import getStore from 'src/configs/store';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import routes from './routes';
import RouteBuilder from './functions/RouteBuilder';

// Get store
const store = getStore();

// Load the icons
loadIcon();

// Render UI
render(
  <Provider store={store}>
    <BrowserRouter>{RouteBuilder(routes)}</BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
