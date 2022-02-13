import React from 'react';
import App from './app';
import Favorites from './pages/FavoritesPage/FavoritesPage';
import LoginPage from './pages/LoginPage/LoginPage';
import Profile from './pages/ProfilePage/ProfilePage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import Training from './pages/TrainingPage/TrainingPage';
import Translate from './pages/TranslatePage/TranslatePage';
import Video from './pages/VideoPage/VideoPage';
import Welcome from './pages/WelcomePage/WelcomePage';

// export interface RouteProps {
//   caseSensitive?: boolean;
//   children?: React.ReactNode;
//   element?: React.ReactNode | null;
//   index?: boolean;
//   path?: string;
// }

export type WRouteProps = {
  path: string;
  element: React.ReactNode;
  index?: boolean;
  children?: WRouteProps[];
};

export type Routes = WRouteProps[];

const Routes: Routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Welcome /> },
      {
        path: 'welcome',
        element: <Welcome />,
      },
      { path: 'favorites', element: <Favorites /> },
      { path: 'training', element: <Training /> },
      { path: 'video', element: <Video /> },
      { path: 'translate', element: <Translate /> },
      {
        path: 'profile',
        element: <Profile />,
      },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignUpPage /> },
    ],
  },
  // Add some route here
];

export default Routes;
