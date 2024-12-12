import { useToast } from "@/components/ui/use-toast";
import { useContext, useRef, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { UserSettingsContext } from "../providers/UserSettingsContext";
import { debounce } from "../utils/Helpers";
import {
  getAvailableDevices,
  getCameraStream,
  getCanvasStream,
  getConnectedDevices,
  getDisconnectedDevices,
  getIdealDevice,
  getMicrophoneStream,
  getScreenshareStream,
} from "../utils/LocalMedia";
import {
  createAudioStageStream,
  createVideoStageStream,
  createScreenShareStageStream,
} from "../utils/StageStrategy";

function useLocalMedia() {
  const { configRef, orientation } = useContext(UserSettingsContext);

  const videoElemRef = useRef();
  const localAudioStreamRef = useRef();
  const localVideoStreamRef = useRef();
  const localVirtualVideoStreamRef = useRef();
  const localVirtualVideoStageStreamRef = useRef();
  const localStageAudioStreamRef = useRef();
  const localStageVideoStreamRef = useRef();
  const localVideoDeviceIdRef = useRef();
  const localAudioDeviceIdRef = useRef();
  const localScreenShareRef = useRef();
  const localStageScreenShareStreamRef = useRef();
  const refreshSceneRef = useRef();
  const whiteboardCanvasRef = useRef();

  const [permissions, setPermissions] = useState(false);
  const [localVideoDeviceError, setLocalVideoDeviceError] = useState(false);
  const [localAudioDeviceError, setLocalAudioDeviceError] = useState(false);
  const [audioDevices, setAudioDevices] = useState([]);
  const [videoDevices, setVideoDevices] = useState([]);
  const [localVideoMounted, setLocalVideoMounted] = useState(false);
  const [localAudioMounted, setLocalAudioMounted] = useState(false);

  const [savedAudioDeviceId, setSavedAudioDeviceId] = useLocalStorage(
    "savedAudioDeviceId",
    undefined
  );
  const [savedVideoDeviceId, setSavedVideoDeviceId] = useLocalStorage(
    "savedVideoDeviceId",
    undefined
  );
  const { toast } = useToast();

  const setInitialDevices = async () => {
    const {
      videoDevices: _videoDevices,
      audioDevices: _audioDevices,
      permissions: _permissions,
    } = await refreshDevices();

    let audioDeviceId = getIdealDevice(savedAudioDeviceId, _audioDevices);
    let videoDeviceId = getIdealDevice(savedVideoDeviceId, _videoDevices);

    const audioStream = await updateLocalAudio(audioDeviceId);
    const videoStream = await updateLocalVideo(videoDeviceId);

    navigator.mediaDevices.addEventListener("devicechange", handleDeviceChange);

    return { audioDeviceId, audioStream, videoDeviceId, videoStream };
  };

  const cleanUpDevices = () => {
    navigator.mediaDevices.removeEventListener(
      "devicechange",
      handleDeviceChange
    );
  };

  const refreshDevices = async (e) => {
    const isDeviceChange = e?.type === "devicechange";

    const {
      videoDevices: _videoDevices,
      audioDevices: _audioDevices,
      permissions,
    } = await getAvailableDevices(
      { savedAudioDeviceId, savedVideoDeviceId },
      toast
    );

    const formattedAudioDevices = _audioDevices.map((device) => {
      return { label: device.label, value: device.deviceId };
    });
    const formattedVideoDevices = _videoDevices.map((device) => {
      return { label: device.label, value: device.deviceId };
    });

    let newAudioDevice;
    let newVideoDevice;

    setAudioDevices((prevState) => {
      if (!isDeviceChange) return formattedAudioDevices;
      if (prevState.length > formattedAudioDevices.length) {
        // Device disconnected
        const [disconnectedDevice] = getDisconnectedDevices(
          prevState,
          formattedAudioDevices
        );
        if (disconnectedDevice.value === localAudioDeviceIdRef.current) {
          // Currently active device was disconnected
          newAudioDevice =
            formattedAudioDevices.find(({ value }) => value === "default") ||
            formattedAudioDevices[0];
        }

        toast({
          variant: "default",
          title: "Mic Disconnected",
          description: `${disconnectedDevice.label} is now disconnected.`,
        });
      } else if (prevState.length < formattedAudioDevices.length) {
        // Device connected
        const [connectedDevice] = getConnectedDevices(
          prevState,
          formattedAudioDevices
        );
        toast({
          variant: "success",
          title: "Mic Connected",
          description: `${connectedDevice.label} is now connected.`,
        });
      }
      return formattedAudioDevices;
    });

    setVideoDevices((prevState) => {
      if (!isDeviceChange) return formattedVideoDevices;
      if (prevState.length > formattedVideoDevices.length) {
        // Device disconnected
        const [disconnectedDevice] = getDisconnectedDevices(
          prevState,
          formattedVideoDevices
        );

        if (disconnectedDevice.value === localAudioDeviceIdRef.current) {
          // Currently active device was disconnected
          newVideoDevice =
            formattedVideoDevices.find(({ value }) => value === "default") ||
            formattedVideoDevices[0];
        }

        toast({
          variant: "default",
          title: "Camera Disconnected",
          description: `${disconnectedDevice.label} is now disconnected.`,
        });
      } else if (prevState.length < formattedVideoDevices.length) {
        // Device connected
        const [connectedDevice] = getConnectedDevices(
          prevState,
          formattedVideoDevices
        );
        toast({
          variant: "default",
          title: "Camera Connected",
          description: `${connectedDevice.label} is now connected.`,
        });
      }
      return formattedVideoDevices;
    });

    let newAudioStream, newVideoStream;
    if (newAudioDevice)
      newAudioStream = await updateLocalAudio(
        newAudioDevice.value,
        formattedAudioDevices
      );
    if (newVideoDevice)
      newVideoStream = await updateLocalVideo(
        newVideoDevice.value,
        formattedVideoDevices
      );

    if (refreshSceneRef.current) {
      const newParams = {};
      if (newAudioStream) newParams.micContent = newAudioStream;
      if (newAudioDevice) newParams.micId = newAudioDevice.value;
      if (newVideoStream) newParams.cameraContent = newVideoStream;
      if (newVideoDevice) newParams.cameraId = newVideoDevice.value;
      refreshSceneRef.current(newParams);
    }

    setPermissions(permissions);

    return {
      audioDevices: formattedAudioDevices,
      videoDevices: formattedVideoDevices,
      permissions,
    };
  };

  const updateLocalAudio = async (deviceId, _audioDevices = audioDevices) => {
    try {
      localAudioStreamRef.current &&
        localAudioStreamRef.current?.getTracks()[0].stop();
    } catch (err) {
      console.error(err);
    }
    const audioStream = await setLocalAudioFromId(deviceId);
    localAudioDeviceIdRef.current = deviceId;
    setSavedAudioDeviceId(deviceId);

    const device = _audioDevices.find((device) => {
      return device.value === deviceId;
    });
    if (device) {
      toast({
        variant: "default",
        title: "Mic Switch",
        description: `Switched to ${device.label} as the new mic.`,
      });
    }
    localStageAudioStreamRef.current = createAudioStageStream(audioStream);
    return audioStream;
  };

  const updateLocalVideo = async (deviceId, _videoDevices = videoDevices) => {
    try {
      localVideoStreamRef.current &&
        localVideoStreamRef.current?.getTracks()[0].stop();
    } catch (err) {
      console.error(err);
    }

    const videoStream = await setLocalVideoFromId(deviceId);
    localVideoDeviceIdRef.current = deviceId;
    setSavedVideoDeviceId(deviceId);

    const device = _videoDevices.find((device) => device.value === deviceId);
    if (device) {
      toast({
        variant: "default",
        title: "Camera Switch",
        description: `Switched to ${device.label} as the new camera.`,
      });
    }
    localStageVideoStreamRef.current = createVideoStageStream(videoStream);
    return videoStream;
  };

  const startScreenShare = async () => {
    let screenShareStream = undefined;
    try {
      screenShareStream = await getScreenshareStream();
      localScreenShareRef.current = screenShareStream;

      localStageScreenShareStreamRef.current = createScreenShareStageStream(
        screenShareStream.getVideoTracks()[0]
      );
    } catch (err) {
      console.error(err);
    }
    return screenShareStream;
  };

  const stopScreenShare = async () => {
    if (localScreenShareRef.current?.getTracks()) {
      for (const track of localScreenShareRef.current?.getTracks()) {
        track.stop();
      }
    }
  };

  // Usage functions for canvas sharing
  const initiateCanvasStream = async (stage) => {
    let screenShareStream = undefined;
    whiteboardCanvasRef.current = stage; // document.getElement("canvas").current;
    try {
      screenShareStream = await getCanvasStream(whiteboardCanvasRef.current);
      if (!localScreenShareRef.current) {
        localScreenShareRef.current = screenShareStream;
      }

      // localStageScreenShareStreamRef.current = createScreenShareStageStream(
      //   screenShareStream.getVideoTracks()[0]
      // );
    } catch (err) {
      console.error(err);
    }
    return screenShareStream;
  };

  const setLocalVideoFromId = async (deviceId) => {
    try {
      const _config = configRef?.current
        ? configRef.current
        : { width: undefined, height: undefined };
      const { width = 640, height = 360 } = _config;

      const videoStream = await getCameraStream({
        deviceId,
        width,
        height,
        facingMode: "environment",
        frameRate: 20,
        aspectRatio: orientation === "LANDSCAPE" ? 16 / 9 : 9 / 16,
      });

      localVideoStreamRef.current = videoStream;
      if (!localVideoMounted) setLocalVideoMounted(true);

      return videoStream;
    } catch (error) {
      console.error("Failed to set local video from ID:", error);
      setLocalVideoDeviceError(true);
      return new MediaStream();
    }
  };

  const setLocalAudioFromId = async (deviceId) => {
    try {
      const audioStream = await getMicrophoneStream(deviceId);
      localAudioStreamRef.current = audioStream;

      if (!localAudioMounted) setLocalAudioMounted(true);

      return audioStream;
    } catch (error) {
      console.error("Failed to initialize local audio:", error);
      setLocalAudioDeviceError(true);
      return new MediaStream();
    }
  };

  const handleDeviceChange = debounce(refreshDevices, 1000);

  return {
    permissions,
    localVideoMounted,
    localAudioMounted,
    audioDevices,
    videoDevices,
    localAudioStreamRef,
    localVideoStreamRef,
    localVirtualVideoStreamRef,
    localVirtualVideoStageStreamRef,
    localAudioDeviceId: savedAudioDeviceId,
    localVideoDeviceId: savedVideoDeviceId,
    videoElemRef,
    refreshSceneRef,
    whiteboardCanvasRef,
    localScreenShareStreamRef: localScreenShareRef,
    localStageScreenShareStreamRef,
    localAudioDeviceIdRef,
    localVideoDeviceIdRef,
    localStageAudioStreamRef,
    localStageVideoStreamRef,
    localAudioDeviceError,
    localVideoDeviceError,
    updateLocalAudio,
    updateLocalVideo,
    setInitialDevices,
    cleanUpDevices,
    refreshDevices,
    setAudioDevices,
    setVideoDevices,
    startScreenShare,
    stopScreenShare,
    initiateCanvasStream,
  };
}

export default useLocalMedia;
