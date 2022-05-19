import React, { Suspense } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { LinearProgress } from '@mui/material';
import MainLayout from './shared/layouts/main-layout';
import RouterProvider from './routes';

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Suspense fallback={<LinearProgress color="secondary" />}>
          <RouterProvider />
        </Suspense>
      </MainLayout>
    </Router>
  );
};
export default App;
