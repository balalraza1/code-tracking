import useBroadcastMixer from "../hooks/useBroadcastMixer";
import { createContext } from "react";

const BroadcastMixerContext = createContext({
  addMixerDevice: undefined,
  addMixerDevices: undefined,
  refreshMixer: undefined,
  removeMixerDevice: undefined,
  removeOldDevices: undefined,
  getMixerDevice: undefined,
  mixerDevicesRef: undefined,
  toggleMute: undefined,
});

function BroadcastMixerProvider({ children }) {
  const {
    addMixerDevice,
    addMixerDevices,
    refreshMixer,
    removeMixerDevice,
    removeOldDevices,
    getMixerDevice,
    mixerDevicesRef,
    toggleMute,
  } = useBroadcastMixer();

  return (
    <BroadcastMixerContext.Provider
      value={{
        addMixerDevice,
        addMixerDevices,
        removeMixerDevice,
        removeOldDevices,
        refreshMixer,
        getMixerDevice,
        mixerDevicesRef,
        toggleMute,
      }}
    >
      {children}
    </BroadcastMixerContext.Provider>
  );
}

export default BroadcastMixerProvider;
export { BroadcastMixerContext };
