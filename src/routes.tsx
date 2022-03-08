import React from 'react';
import { RouteObject } from 'react-router-dom';

const Welcome = React.lazy(() => import('./pages/WelcomePage/WelcomePage'));
const Favorites = React.lazy(() => import('./pages/FavoritesPage/FavoritesPage'));
const Translate = React.lazy(() => import('./pages/TranslatePage/TranslatePage'));
const Training = React.lazy(() => import('./pages/TrainingPage/TrainingPage'));
const VocabularyCategory = React.lazy(() => import('./pages/TrainingPage/CategoryPage'));
const Vocabulary = React.lazy(() => import('./pages/TrainingPage/VocabularyPage'));
const Video = React.lazy(() => import('./pages/VideoPage/VideoPage'));
const VideoCategory = React.lazy(() => import('./pages/VideoPage/VideoCategoryPage'));
const VideoList = React.lazy(() => import('./pages/VideoPage/VideoList'));
const Profile = React.lazy(() => import('./pages/ProfilePage/ProfilePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage/LoginPage'));
const SignUpPage = React.lazy(() => import('./pages/SignUpPage/SignUpPage'));
const UpdatePassword = React.lazy(() => import('./pages/UpdatePasswordPage/UpdatePassword'));

const ROUTES: RouteObject[] = [
  { path: '/', element: <Welcome /> },
  { path: 'welcome', element: <Welcome /> },
  { path: 'favorites', element: <Favorites /> },
  {
    path: 'training',
    element: <Training />,
    children: [
      { path: '', element: <VocabularyCategory />, index: true },
      { path: ':categoryId', element: <Vocabulary /> },
    ],
  },
  {
    path: 'video',
    element: <Video />,
    children: [
      { path: '', element: <VideoCategory />, index: true },
      {
        path: ':categoryId',
        element: <VideoList />,
      },
    ],
  },
  { path: 'translate', element: <Translate /> },
  { path: 'profile', element: <Profile /> },
  { path: 'login', element: <LoginPage /> },
  { path: 'signup', element: <SignUpPage /> },
  { path: 'update-password', element: <UpdatePassword /> },
  // Add some route here
];

export default ROUTES;
