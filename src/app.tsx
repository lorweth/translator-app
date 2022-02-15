import React, { useState } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ROUTES from './routes';

const BrowerRouterProvider = () => {
  const routeElements = useRoutes(ROUTES);
  return routeElements;
};

const App = () => {
  return (
    <Router>
      <BrowerRouterProvider />
    </Router>
  );
};
export default App;
