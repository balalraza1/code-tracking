import useBroadcastLayout from "../hooks/useBroadcastLayout";
import { createContext, useMemo } from "react";

const BroadcastLayoutContext = createContext({
  layersRef: undefined,
  screenShareActive: undefined,
  toggleScreenSharing: undefined,
  toggleCamVisiblity: undefined,
  showScreenShare: undefined,
  showFullScreenCam: undefined,
  removeAllLayers: undefined,
});

function BroadcastLayoutProvider({ children }) {
  const {
    layersRef,
    screenShareActive,
    toggleScreenSharing,
    toggleCamVisiblity,
    showScreenShare,
    showFullScreenCam,
    refreshCurrentScene,
    removeAllLayers,
  } = useBroadcastLayout();

  return (
    <BroadcastLayoutContext.Provider
      value={useMemo(() => {
        return {
          layersRef,
          screenShareActive,
          toggleScreenSharing,
          toggleCamVisiblity,
          showScreenShare,
          showFullScreenCam,
          refreshCurrentScene,
          removeAllLayers,
        };
      }, [
        layersRef,
        screenShareActive,
        toggleScreenSharing,
        toggleCamVisiblity,
        showScreenShare,
        showFullScreenCam,
        refreshCurrentScene,
        removeAllLayers,
      ])}
    >
      {children}
    </BroadcastLayoutContext.Provider>
  );
}

export default BroadcastLayoutProvider;
export { BroadcastLayoutContext };
