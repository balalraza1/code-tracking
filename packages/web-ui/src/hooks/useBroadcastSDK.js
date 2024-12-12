import { useToast } from "@/components/ui/use-toast";
import { useContext, useRef, useState } from "react";
import { UserSettingsContext } from "../providers/UserSettingsContext";
import { LocalMediaContext } from "../providers/LocalMediaContext";

const useBroadcastSDK = () => {
  const {
    streamKey,
    configRef,
    ingestEndpoint,
    sessionStartTime,
    micMuted,
    cameraActive,
  } = useContext(UserSettingsContext);
  const [broadcastClientMounted, setBroadcastClientMounted] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [streamPending, setStreamPending] = useState(false);
  const [connectionState, setConnectionState] = useState();
  const [clientErrors, setClientErrors] = useState([]);
  const IVSBroadcastClientRef = useRef(undefined);
  const broadcastClientRef = useRef(undefined);
  const broadcastClientEventsRef = useRef(undefined);
  const startTimeRef = useRef(undefined);
  const sdkVersionRef = useRef(undefined);
  const { toast } = useToast();
  const { localAudioDeviceId, localVideoDeviceId, localVideoStreamRef } =
    useContext(LocalMediaContext);

  const importBroadcastSDK = async () => {
    const sdk = (await import("amazon-ivs-web-broadcast")).default;
    broadcastClientEventsRef.current = sdk.BroadcastClientEvents;
    IVSBroadcastClientRef.current = sdk;
    return sdk;
  };

  const createBroadcastClient = async ({ config: streamConfig }) => {
    const IVSBroadcastClient = IVSBroadcastClientRef.current
      ? IVSBroadcastClientRef.current
      : await importBroadcastSDK();

    const client = IVSBroadcastClient.create({
      streamConfig,
    });

    broadcastClientRef.current = client;
    sdkVersionRef.current = IVSBroadcastClient.__version;
    setIsSupported(IVSBroadcastClient.isSupported());
    attachBroadcastClientListeners(client);

    // Hack to get fix react state update issue
    setBroadcastClientMounted(new Date());

    return client;
  };

  const destroyBroadcastClient = (client) => {
    detachBroadcastClientListeners(client);
    // client.delete();
    setBroadcastClientMounted(false);
  };

  const attachBroadcastClientListeners = (client) => {
    client.on(
      broadcastClientEventsRef.current.CONNECTION_STATE_CHANGE,
      handleConnectionStateChange
    );
    client.on(
      broadcastClientEventsRef.current.ACTIVE_STATE_CHANGE,
      handleActiveStateChange
    );
    client.on(broadcastClientEventsRef.current.ERROR, handleClientError);
  };

  const detachBroadcastClientListeners = (client) => {
    client.off(
      broadcastClientEventsRef.current.CONNECTION_STATE_CHANGE,
      handleConnectionStateChange
    );
    client.off(
      broadcastClientEventsRef.current.ACTIVE_STATE_CHANGE,
      handleActiveStateChange
    );
    client.off(broadcastClientEventsRef.current.ERROR, handleClientError);
  };

  const restartBroadcastClient = async ({ config, ingestEndpoint }) => {
    if (isLive) stopStream(broadcastClientRef.current);
    destroyBroadcastClient(broadcastClientRef.current);

    const newClient = await createBroadcastClient({
      config,
      ingestEndpoint,
    });

    return newClient;
  };

  const handleActiveStateChange = (active) => {
    setIsLive(active);
  };

  const handleConnectionStateChange = (state) => {
    setConnectionState(state);
  };

  const handleClientError = (clientError) => {
    setClientErrors((prevState) => [...prevState, clientError]);
  };

  const stopStream = async (client) => {
    try {
      setStreamPending(true);
      toast({
        variant: "default",
        title: "Ending Stream",
        description:
          "Initiating the process to stop the stream. Please wait...",
      });

      await client.stopBroadcast();
      startTimeRef.current = undefined;
      toast({
        variant: "default",
        title: "Stream Ended",
        description:
          "The stream has been successfully stopped. You are now offline.",
      });
    } catch (err) {
      console.error(err);
      toast({
        variant: "default",
        title: "Stream Error",
        description:
          "We encountered an issue stopping your stream. Please try again or check your connection.",
      });
    } finally {
      setStreamPending(false);
    }
  };

  const startStream = async ({ client, streamKey, ingestEndpoint }) => {
    let streamTimeout;
    try {
      toast({
        variant: "default",
        title: "Preparing Stream",
        description: "Starting your stream. Please stand by...",
      });

      setStreamPending(true);

      streamTimeout = setTimeout(() => {
        toast({
          variant: "default",
          title: "Stream Delay Warning",
          description:
            "Your stream is taking longer than expected to start. Please check your network settings or VPN configurations and try again.",
        });
      }, 5000);

      await client.startBroadcast(streamKey, ingestEndpoint);

      if (micMuted === true) {
        const audioTrack = broadcastClientRef.current
          .getAudioInputDevice(localAudioDeviceId)
          .getAudioTracks()[0];
        audioTrack.enabled = false;
      }
      if (cameraActive !== true) {
        const currentCam =
          broadcastClientRef.current.getVideoInputDevice(localVideoDeviceId);
        const currentVideoTrack =
          localVideoStreamRef.current.getVideoTracks()[0];
        currentVideoTrack.enabled = false;
        currentCam.render = false;
      }

      clearTimeout(streamTimeout);
      startTimeRef.current = sessionStartTime
        ? new Date(sessionStartTime)
        : new Date();
      toast({
        variant: "default",
        title: "Stream Live",
        description: "Your stream is now live! Engage with your audience.",
      });
    } catch (err) {
      console.log(err);
      clearTimeout(streamTimeout);

      if (err.code === 10003) {
        toast({
          variant: "default",
          title: "Stream Key Error",
          description:
            "The provided stream key is invalid. Please enter a correct stream key to proceed.",
        });
      } else if (err.code === 10000) {
        toast({
          variant: "default",
          title: "Ingest Endpoint Error",
          description:
            "The provided ingest endpoint is invalid. Please enter a correct ingest endpoint to proceed.",
        });
      } else {
        toast({
          variant: "default",
          title: "Stream Failure",
          description:
            "Unable to start the stream due to an error. Check your settings and try again.",
        });
      }
    } finally {
      setStreamPending(false);
    }
  };

  const toggleStream = async () => {
    if (isLive) {
      await stopStream(broadcastClientRef.current);
    } else {
      await startStream({
        client: broadcastClientRef.current,
        streamKey,
        ingestEndpoint,
      });
    }
  };

  return {
    IVSBroadcastClientRef,
    sdkVersionRef,
    broadcastClientMounted,
    broadcastClientRef,
    connectionState,
    isLive,
    isSupported,
    streamPending,
    setStreamPending,
    broadcastStartTimeRef: startTimeRef,
    broadcastErrors: clientErrors,
    toggleStream,
    stopStream,
    startStream,
    createBroadcastClient,
    destroyBroadcastClient,
    restartBroadcastClient,
  };
};

export default useBroadcastSDK;
