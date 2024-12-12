import { createContext } from "react";
import {
  getSavedValuesFromLocalStorage,
  clearSavedSettings,
} from "../utils/UserSettings";
import { useSavedValuesFromLocalStorage } from "../utils/UserSettings";
const UserSettingsContext = createContext({
  channelType: undefined,
  setChannelType: undefined,
  selectedVideoDeviceId: undefined,
  setSelectedVideoDeviceId: undefined,
  selectedAudioDeviceId: undefined,
  setSelectedAudioDeviceId: undefined,
  orientation: undefined,
  setOrientation: undefined,
  resolution: undefined,
  setResolution: undefined,
  configRef: undefined,
  streamKey: "",
  setStreamKey: undefined,
  ingestEndpoint: "",
  setIngestEndpoint: undefined,
  localVideoMirror: undefined,
  setLocalVideoMirror: undefined,
  audioNoiseSuppression: undefined,
  setAudioNoiseSuppression: undefined,
  autoGainControl: undefined,
  setAutoGainControl: undefined,
  saveSettings: undefined,
  setSaveSettings: undefined,
  username: undefined,
  setUsername: undefined,
  role: undefined,
  setRole: undefined,
  email: undefined,
  setEmail: undefined,
  authToken: undefined,
  setAuthToken: undefined,
  sessionId: undefined,
  setSessionId: undefined,
  sessionStartTime: undefined,
  setSessionStartTime: undefined,
  micMuted: undefined,
  setMicMuted: undefined,
  cameraActive: undefined,
  setCameraActive: undefined,
  stageGroupId: undefined,
  setStageGroupId: undefined,
  participantToken: undefined,
  setParticipantToken: undefined,
  participantId: undefined,
  setParticipantId: undefined,
  isStageOwner: undefined,
  setIsStageOwner: undefined,
  stageJoinedRef: undefined,
  stageInfo: null,
  activeScreenSharerId: null,
  setActiveScreenSharerId: null,
  vbgIndex: undefined,
  setVbgIndex: undefined,
});

function UserSettingsProvider({ children }) {
  const savedValues = useSavedValuesFromLocalStorage();

  return (
    <UserSettingsContext.Provider
      value={{ clearSavedSettings, ...savedValues }}
    >
      {children}
    </UserSettingsContext.Provider>
  );
}

export default UserSettingsProvider;
export { UserSettingsContext };
