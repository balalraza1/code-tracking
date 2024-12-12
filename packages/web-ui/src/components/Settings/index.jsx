import { Button } from "@/components/ui/button";
import { useContext, useState, useEffect } from "react";
import { BroadcastLayoutContext } from "../../providers/BroadcastLayoutContext";
import { LocalMediaContext } from "../../providers/LocalMediaContext";
import { DialogContext } from "../../providers/ModalContext";
import { UserSettingsContext } from "../../providers/UserSettingsContext";
import Select from "../Select";
import Switch from "../Switch";
import { StageContext } from "../../providers/StageContext";

export default function Settings() {
  const {
    setSavedVideoDeviceId,
    setSavedAudioDeviceId,
    localVideoMirror,
    setLocalVideoMirror,
    saveSettings,
    setSaveSettings,
    clearSavedSettings,
    micMuted,
    setMicMuted,
    setCameraActive,
  } = useContext(UserSettingsContext);

  const {
    audioDevices,
    videoDevices,
    localVideoDeviceId,
    localAudioStreamRef,
    localAudioDeviceId,
    updateLocalAudio,
    updateLocalVideo,
    localVideoStreamRef,
    localStageVideoStreamRef,
    localStageAudioStreamRef,
  } = useContext(LocalMediaContext);
  const { stageRef, strategyRef } = useContext(StageContext);

  // const { micMuted, setMicMuted } = useContext(BroadcastMixerContext);
  const { refreshCurrentScene } = useContext(BroadcastLayoutContext);
  const { closeDialog } = useContext(DialogContext);

  const [_videoDevice, _setVideoDevice] = useState(localVideoDeviceId);
  const [_audioDevice, _setAudioDevice] = useState(localAudioDeviceId);

  const [_localVideoMirror, _setLocalVideoMirror] = useState(localVideoMirror);
  const [localAudioDevices, setLocalAudioDevices] = useState([]);
  const [localVideoDevices, setLocalVideoDevices] = useState([]);
  const [savingSettings, setSavingSettings] = useState(false);

  useEffect(() => {
    async function getDevices() {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices
        .filter((device) => device.kind === "videoinput")
        .map((device) => ({
          label: device.label,
          id: device.deviceId,
          value: device.deviceId,
        }));
      const audioDevices = devices
        .filter(
          (device) =>
            device.kind === "audioinput" &&
            device.deviceId !== "default" &&
            device.deviceId !== "communications"
        )
        .map((device) => ({
          label: device.label,
          id: device.deviceId,
          value: device.label,
        }));
      setLocalAudioDevices(audioDevices);
      setLocalVideoDevices(videoDevices);
    }
    getDevices();
  }, []);

  const handleLocalModalSave = async (e) => {
    setSavingSettings(true);

    let sceneRefreshRequired = false;
    let _videoStream = undefined;

    if (_videoDevice !== localVideoDeviceId) {
      _videoStream = await updateLocalVideo(_videoDevice);
      strategyRef.current?.updateMedia(
        localStageAudioStreamRef.current,
        localStageVideoStreamRef.current
      );
      stageRef?.current?.refreshStrategy();
      window.location.reload();
      sceneRefreshRequired = true;
    }

    if (_audioDevice !== localAudioDeviceId) {
      await updateLocalAudio(_audioDevice);
      setMicMuted(false);
      sceneRefreshRequired = true;
    }

    if (_localVideoMirror !== localVideoMirror) {
      setLocalVideoMirror(_localVideoMirror);
    }

    // if (sceneRefreshRequired) {
    //   await refreshCurrentScene({
    //     cameraContent: _videoStream,
    //     cameraId: _videoDevice,
    //     micContent: localAudioStreamRef.current,
    //     micId: _audioDevice,
    //     showMuteIcon: micMuted,
    //   });
    // }

    if (saveSettings) {
      setSavedVideoDeviceId(_videoDevice);
      setSavedAudioDeviceId(_audioDevice);
      setSavingSettings(true);
    }

    closeDialog();
  };

  return (
    <div className="flex flex-col gap-2">
      <Select
        items={localVideoDevices}
        name={"Webcam "}
        onChange={(id) => {
          _setVideoDevice(id);
        }}
        defaultValue={_videoDevice}
      />
      <div className=" text-sm text-gray-500 font-weight-500">
        Changing video device during class will reload your page
      </div>
      {/* <Switch
        label="Mirror webcam preview"
        onChange={(checked) => {
          _setLocalVideoMirror(checked);
        }}
        defaultValue={_localVideoMirror}
      /> */}

      {/* <Select
        items={localAudioDevices}
        name={"Mic "}
        onChange={(id, label) => {
          _setAudioDevice(id);
        }}
        defaultValue={_audioDevice}
      /> */}

      {/* <Switch
        label="Remember my settings on this browser"
        onChange={(checked) => {
          console.log("Checked", checked);
          setSaveSettings(checked);
        }}
        defaultValue={saveSettings}
      /> */}

      <Button
        type="primary"
        variant="default"
        fullWidth={true}
        onClick={handleLocalModalSave}
        loading={savingSettings}
      >
        Save
      </Button>
    </div>
  );
}
