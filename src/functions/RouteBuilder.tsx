/* eslint-disable no-console */
import React from 'react';
import { Route, RouteObject, Routes } from 'react-router-dom';

// Render Route
export const RenderRoute = (routeData: RouteObject) =>
  routeData.children && routeData.children.length > 0 ? (
    <Route
      key={routeData.path}
      path={routeData.path}
      element={routeData.element}
      index={routeData.index}
    >
      {routeData.children.map((child: RouteObject) => RenderRoute(child))}
    </Route>
  ) : (
    <Route
      key={routeData.path}
      path={routeData.path}
      element={routeData.element}
      index={routeData.index}
    />
  );

const RoutesBuilder = (routes: RouteObject[]) => (
  <Routes>{routes.map((routeData: RouteObject) => RenderRoute(routeData))}</Routes>
);

export default RoutesBuilder;
