import React, { createContext, useMemo } from "react";
import useStageLayout from "../hooks/useStageLayout";

const StageLayoutContext = createContext({
  screenShareActive: undefined,
  setScreenShareActive: undefined,
  whiteboardActive: undefined,
  setWhiteboardActive: undefined,
  toggleWhiteboarding: undefined,
  toggleScreenSharing: undefined,
  handleMicMute: undefined,
  handleCameraMute: undefined,
  noteboardActive:undefined,
  setNoteboardActive:undefined,
  toggleNoteBoarding:undefined
});

function StageLayoutProvider({ children }) {
  const {
    screenShareActive,
    whiteboardActive,
    setWhiteboardActive,
    toggleScreenSharing,
    toggleWhiteboarding,
    handleMicMute,
    handleCameraMute,
    noteboardActive,
    toggleNoteBoarding
  } = useStageLayout();

  const value = useMemo(
    () => ({
      screenShareActive,
      whiteboardActive,
      setWhiteboardActive,
      toggleScreenSharing,
      toggleWhiteboarding,
      handleMicMute,
      handleCameraMute,
      noteboardActive,
      toggleNoteBoarding
    }),
    [
      screenShareActive,
      whiteboardActive,
      setWhiteboardActive,
      toggleScreenSharing,
      toggleWhiteboarding,
      handleMicMute,
      handleCameraMute,
      noteboardActive,
      toggleNoteBoarding
    ]
  );

  return (
    <StageLayoutContext.Provider value={value}>
      {children}
    </StageLayoutContext.Provider>
  );
}

export default StageLayoutProvider;
export { StageLayoutContext };
