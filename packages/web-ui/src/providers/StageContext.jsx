import React, { createContext, useMemo } from "react";
import useStageSDK from "../hooks/useStageSDK";

const StageContext = createContext({
  joinStage: undefined,
  leaveStage: undefined,
  participants: [],
  setParticipants: undefined,
  localParticipant: undefined,
  setLocalParticipant:undefined,
  stageJoined: false,
  stageRef: undefined,
  strategyRef: undefined,
  isInitializeComplete: false,
  recodingEnabled: false,
  setRecordingEnabled: undefined,
});

function StageProvider({ children }) {
  const {
    joinStage,
    leaveStage,
    participants,
    setParticipants,
    localParticipant,
    setLocalParticipant,
    stageJoined,
    stageRef,
    strategyRef,
    isInitializeComplete,
    recodingEnabled,
    setRecordingEnabled,
  } = useStageSDK();

  const value = useMemo(
    () => ({
      joinStage,
      leaveStage,
      participants,
      setParticipants,
      stageJoined,
      localParticipant,
      setLocalParticipant,
      stageRef,
      strategyRef,
      isInitializeComplete,
      recodingEnabled,
      setRecordingEnabled,
    }),
    [
      joinStage,
      leaveStage,
      participants,
      setParticipants,
      stageJoined,
      localParticipant,
      setLocalParticipant,
      stageRef,
      strategyRef,
      isInitializeComplete,
      recodingEnabled,
      setRecordingEnabled,
    ]
  );

  return (
    <StageContext.Provider value={value}>{children}</StageContext.Provider>
  );
}

export default StageProvider;
export { StageContext };
