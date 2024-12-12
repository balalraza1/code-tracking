import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

import useContextHook from '../hooks/useContextHook';

const Context = createContext(null);
Context.displayName = 'ViewerStreamActions';

export const Provider = () => {
  const [currentViewerAction, setCurrentViewerAction] = useState();
  const outletCtx = useOutletContext();
  const currentViewerStreamActionData = currentViewerAction?.data;
  const currentViewerStreamActionStartTime = currentViewerAction?.startTime;
  const currentViewerStreamActionName = currentViewerAction?.name;
  const currentViewerStreamActionTitle = `${currentViewerStreamActionName
    ?.charAt(0)
    ?.toUpperCase()}${currentViewerStreamActionName
    ?.slice(1)
    ?.replace(/_/g, ' ')}`;
  const augmentedCurrentViewerStreamActionData = useMemo(
    () => ({
      ...currentViewerStreamActionData,
      startTime: currentViewerStreamActionStartTime
    }),
    [currentViewerStreamActionData, currentViewerStreamActionStartTime]
  );
  const { duration: viewerActionDuration, startTime: viewerActionStartTime } =
    augmentedCurrentViewerStreamActionData;

  const clearCurrentViewerAction = useCallback(
    () => setCurrentViewerAction(null),
    []
  );

  const value = useMemo(
    () => ({
      clearCurrentViewerAction,
      currentViewerStreamActionData: augmentedCurrentViewerStreamActionData,
      currentViewerStreamActionName,
      currentViewerStreamActionTitle,
      setCurrentViewerAction
    }),
    [
      augmentedCurrentViewerStreamActionData,
      clearCurrentViewerAction,
      currentViewerStreamActionName,
      currentViewerStreamActionTitle,
      setCurrentViewerAction
    ]
  );

  return (
    <Context.Provider value={value}>
      <Outlet context={outletCtx} />
    </Context.Provider>
  );
};

export const useViewerStreamActions = () => useContextHook(Context);
