import React from 'react';
import { Route, RouteObject, Routes, useLocation, useRoutes } from 'react-router-dom';

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

const ROUTES: Array<RouteObject> = [
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

const modalRoutes: Array<RouteObject> = [];

export default function RouterProvider() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  const elm = useRoutes(ROUTES, state?.backgroundLocation || location);

  return (
    <>
      {elm}

      {/* Show the modal when a `backgroundLocation` is set */}
      {state?.backgroundLocation && (
        <Routes>
          {modalRoutes &&
            modalRoutes.length > 0 &&
            modalRoutes.map(r => <Route key={r.path} path={r.path} element={r.element} />)}
        </Routes>
      )}
    </>
  );
}
