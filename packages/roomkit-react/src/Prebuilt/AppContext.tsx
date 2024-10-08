import React, { useContext } from "react";
import { HMSPeer } from "@100mslive/react-sdk";
// @ts-ignore
import { DEFAULT_PORTAL_CONTAINER } from "./common/constants";

export type UpdateRoomPayload = {
  roomId: string;
  status: string;
  leadIds?: string[];
};

type HMSPrebuiltContextType = {
  roomCode: string;
  userName?: string;
  userId?: string;
  sessionId?: string;
  studentAppURL?: string;
  containerSelector: string;
  endpoints?: Record<string, string>;
  onLeave?: () => void;
  onJoin?: () => void;
  createBreakoutRoom?: (
    sessionId: string,
    selectedParticipants: HMSPeer[]
  ) => any;
  launchQuiz?: () => any;
  endQuiz?: (payload: UpdateRoomPayload) => any;
  enableBreakoutRooms?: boolean;
  rolesToCreateBreakoutRooms?: string[];
};

export const HMSPrebuiltContext = React.createContext<HMSPrebuiltContextType>({
  roomCode: "",
  userName: "",
  userId: "",
  sessionId: "",
  studentAppURL: "",
  containerSelector: DEFAULT_PORTAL_CONTAINER,
  endpoints: {},
  onLeave: undefined,
  onJoin: undefined,
  rolesToCreateBreakoutRooms: [],
  enableBreakoutRooms: false,
  createBreakoutRoom: undefined,
  launchQuiz: undefined,
  endQuiz: undefined,
});

HMSPrebuiltContext.displayName = "HMSPrebuiltContext";

export const useHMSPrebuiltContext = () => {
  const context = useContext(HMSPrebuiltContext);
  if (!context) {
    throw Error(
      "Make sure HMSPrebuiltContext.Provider is present at the top level of your application"
    );
  }
  return context;
};
