import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export interface RouteParams {
  id: string;
  organization: string;
  ppm: string;
  wbsComponent: string;
}

const RouteParamsContext = React.createContext<RouteParams>({
  id: null,
  organization: null,
  ppm: null,
  wbsComponent: null,
});

export const RouteParamsProvider = props => {
  const path = useLocation().pathname;
  const [params, setParams] = useState<RouteParams>(getUrlParams(path));

  useEffect(() => {
    const newParams = getUrlParams(path);
    if (JSON.stringify(newParams) !== JSON.stringify(params)) {
      setParams(getUrlParams(path));
    }
  }, [path]);

  const value = React.useMemo(() => params, [JSON.stringify(params)]);

  return <RouteParamsContext.Provider value={value} {...props} />;
};

export const useRouteParams = () => {
  const context = React.useContext(RouteParamsContext);
  if (!context) {
    throw new Error(`useRouteParams must be used within a RouteParamsProvider`);
  }
  return context;
};

const getUrlParams = (url: string): RouteParams => {
  const orgIdMatch = url.match(/organizations\/(.*?)\//) || url.match(/organizations\/(.*)/);
  const orgId = orgIdMatch ? orgIdMatch[1] : null;

  const ppmIdMatch = url.match(/ppms\/(.*?)\//) || url.match(/ppms\/(.*)/);
  const ppmId = ppmIdMatch ? ppmIdMatch[1] : null;

  const wbsComponentIdMatch =
    url.match(/wbs-components\/(.*?)\//) || url.match(/wbs-components\/(.*)/);
  const wbsComponentId = wbsComponentIdMatch ? wbsComponentIdMatch[1] : null;

  let currentActiveItem;
  if (wbsComponentId) {
    currentActiveItem = wbsComponentId;
  } else if (ppmId) {
    currentActiveItem = ppmId;
  } else if (orgId) {
    currentActiveItem = orgId;
  }

  const params = {
    id: currentActiveItem || null,
    organization: orgId,
    ppm: ppmId,
    wbsComponent: wbsComponentId,
  };

  return params;
};
