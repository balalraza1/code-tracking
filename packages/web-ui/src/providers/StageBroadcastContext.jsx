import { createContext } from "react";
import { useStageBroadcast } from "../hooks/useStageBroadcast";

export const STAGE_BROADCAST_STATUS = {
  LIVE: "LIVE",
  OFFLINE: "OFFLINE",
  LOADING: "LOADING",
  ERROR: "ERROR",
};

export const StageBroadcastContext = createContext({
  broadcastSdkRef: null,
  broadcastClientRef: null,
  broadcastStartTimeRef: null,
  isSupported: null,
  streamPending: null,
  connectionState: null,
  broadcastErrors: null,
  isBroadcasting: false,
  addAudioStreamToClient: null,
  addVideoStreamToClient: null,
  startBroadcast: null,
  stopBroadcast: null,
  createBroadcastClient: null,
  destroyBroadcastClient: null,
  restartBroadcastClient: null,
});

export const StageBroadcastProvider = ({ children }) => {
  const state = useStageBroadcast();

  return (
    <StageBroadcastContext.Provider value={state}>
      {children}
    </StageBroadcastContext.Provider>
  );
};
