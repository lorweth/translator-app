/* eslint-disable no-console */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { WRouteProps } from 'src/routes';

// Render Route
export const RenderRoute = (routeData: WRouteProps) =>
  routeData.children && routeData.children.length > 0 ? (
    <Route
      key={routeData.path}
      path={routeData.path}
      element={routeData.element}
      index={routeData.index}
    >
      {routeData.children.map((child: WRouteProps) => RenderRoute(child))}
    </Route>
  ) : (
    <Route
      key={routeData.path}
      path={routeData.path}
      element={routeData.element}
      index={routeData.index}
    />
  );

const RoutesBuilder = (routes: WRouteProps[]) => (
  <Routes>{routes.map((routeData: WRouteProps) => RenderRoute(routeData))}</Routes>
);

export default RoutesBuilder;
