import { createContext, useMemo } from "react";
import useVirtualBackground from "../hooks/useVirtualBackground";

const VirtualBackgroundContext = createContext({
  virtualBgEnabled: undefined,
  virtualBgStream: undefined,
  enableVirtualBg: undefined,
  enableVirtualBgBlur: undefined,
  disableVirtualBg: undefined,
});

function VirtualBackgroundProvider({ children }) {
  const {
    virtualBgEnabled,
    virtualBgStream,
    enableVirtualBg,
    enableVirtualBgBlur,
    disableVirtualBg,
  } = useVirtualBackground();

  const state = useMemo(() => ({
    virtualBgEnabled,
    virtualBgStream,
    enableVirtualBg,
    enableVirtualBgBlur,
    disableVirtualBg,
  }), [
    virtualBgEnabled,
    virtualBgStream,
    enableVirtualBg,
    enableVirtualBgBlur,
    disableVirtualBg,
  ]);

  return (
    <VirtualBackgroundContext.Provider value={state}>
      {children}
    </VirtualBackgroundContext.Provider>
  );
}

export default VirtualBackgroundProvider;
export { VirtualBackgroundContext };
