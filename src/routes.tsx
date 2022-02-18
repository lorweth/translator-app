import React from 'react';
import { RouteObject } from 'react-router-dom';
import CategoryPage from './pages/TrainingPage/CategoryPage';

// import Favorites from './pages/FavoritesPage/FavoritesPage';
// import LoginPage from './pages/LoginPage/LoginPage';
// import Profile from './pages/ProfilePage/ProfilePage';
// import SignUpPage from './pages/SignUpPage/SignUpPage';
// import Training from './pages/TrainingPage/TrainingPage';
// import Translate from './pages/TranslatePage/TranslatePage';
// import Video from './pages/VideoPage/VideoPage';
// import Welcome from './pages/WelcomePage/WelcomePage';
// import MainLayout from './shared/layouts/main-layout';

// const MainLayout = React.lazy(() => import('src/shared/layouts/main-layout'));
const Welcome = React.lazy(() => import('./pages/WelcomePage/WelcomePage'));
const Favorites = React.lazy(() => import('./pages/FavoritesPage/FavoritesPage'));
const Translate = React.lazy(() => import('./pages/TranslatePage/TranslatePage'));
const Training = React.lazy(() => import('./pages/TrainingPage/TrainingPage'));
const Vocabulary = React.lazy(() => import('./pages/TrainingPage/VocabularyPage'));
const Video = React.lazy(() => import('./pages/VideoPage/VideoPage'));
const Profile = React.lazy(() => import('./pages/ProfilePage/ProfilePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage/LoginPage'));
const SignUpPage = React.lazy(() => import('./pages/SignUpPage/SignUpPage'));

const ROUTES: RouteObject[] = [
  // {
  //   path: '/',
  //   element: <MainLayout />,
  //   children: [
  //     { path: '/', element: <Welcome /> },
  //     {
  //       path: 'welcome',
  //       element: <Welcome />,
  //     },
  //     { path: 'favorites', element: <Favorites /> },
  //     { path: 'training', element: <Training /> },
  //     { path: 'video', element: <Video /> },
  //     { path: 'translate', element: <Translate /> },
  //     {
  //       path: 'profile',
  //       element: <Profile />,
  //     },
  //     { path: 'login', element: <LoginPage /> },
  //     { path: 'signup', element: <SignUpPage /> },
  //   ],
  // },
  { path: '/', element: <Welcome /> },
  { path: 'welcome', element: <Welcome /> },
  { path: 'favorites', element: <Favorites /> },
  {
    path: 'training',
    element: <Training />,
    children: [
      { path: '', element: <CategoryPage />, index: true },
      { path: ':categoryId', element: <Vocabulary /> },
    ],
  },
  { path: 'video', element: <Video /> },
  { path: 'translate', element: <Translate /> },
  { path: 'profile', element: <Profile /> },
  { path: 'login', element: <LoginPage /> },
  { path: 'signup', element: <SignUpPage /> },
  // Add some route here
];

export default ROUTES;
