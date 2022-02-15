import React from 'react';
import { RouteObject } from 'react-router-dom';

const Welcome = React.lazy(() => import('./pages/WelcomePage/WelcomePage'));
const Favorites = React.lazy(() => import('./pages/FavoritesPage/FavoritesPage'));
const Translate = React.lazy(() => import('./pages/TranslatePage/TranslatePage'));
const Training = React.lazy(() => import('./pages/TrainingPage/TrainingPage'));
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
  { path: '/welcome', element: <Welcome /> },
  { path: '/favorites', element: <Favorites /> },
  { path: '/training', element: <Training /> },
  { path: '/video', element: <Video /> },
  { path: '/translate', element: <Translate /> },
  { path: '/profile', element: <Profile /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignUpPage /> },
  // Add some route here
];

export default ROUTES;
