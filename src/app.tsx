import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ROUTES from './routes';
import MainLayout from 'src/shared/layouts/main-layout';

const BrowerRouterProvider = () => {
  const routeElements = useRoutes(ROUTES);
  return routeElements;
};

const App = () => {
  return (
    <Router>
      <MainLayout>
        <BrowerRouterProvider />
      </MainLayout>
    </Router>
  );
};
export default App;
