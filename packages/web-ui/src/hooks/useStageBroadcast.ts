import { useContext, useRef, useState } from "react";
import { UserSettingsContext } from "../providers/UserSettingsContext";
import { useToast } from "../shadcn/components/ui/use-toast";
import { AmazonIVSBroadcastClient } from "amazon-ivs-web-broadcast";
import { LocalMediaContext } from "../providers/LocalMediaContext";

export const useStageBroadcast = () => {
  const { streamKey, configRef, ingestEndpoint } =
    useContext(UserSettingsContext);
  const { localStageAudioStreamRef, localStageVideoStreamRef } =
    useContext(LocalMediaContext);
  // const [isLive, setIsLive] = useState(false);
  const { toast } = useToast();
  const [isSupported, setIsSupported] = useState(true);
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  const [connectionState, setConnectionState] = useState();
  const [clientErrors, setClientErrors] = useState([]);
  const [broadcastClientMounted, setBroadcastClientMounted] = useState(null);
  const [streamPending, setStreamPending] = useState(false);

  const broadcastClientEventsRef = useRef(null);
  const broadcastSdkRef = useRef(null);
  const broadcastClientRef = useRef<AmazonIVSBroadcastClient>(null);
  const startTimeRef = useRef(null);

  const importBroadcastSDK = async () => {
    const sdk = (await import("amazon-ivs-web-broadcast")).default;
    broadcastClientEventsRef.current = sdk.BroadcastClientEvents;
    return sdk;
  };

  const createBroadcastClient = async ({ config: streamConfig }) => {
    if (!broadcastSdkRef.current) {
      broadcastSdkRef.current = await importBroadcastSDK();
    }

    broadcastClientRef.current = broadcastSdkRef.current.create({
      ingestEndpoint,
      streamConfig,
    });
    setIsSupported(broadcastSdkRef.current.isSupported());
    attachBroadcastClientListeners();
    //
    setBroadcastClientMounted(new Date());

    return broadcastClientRef.current;
  };

  const destroyBroadcastClient = () => {
    detachBroadcastClientListeners();
    broadcastClientRef.current.delete();
    setBroadcastClientMounted(null);
  };

  const attachBroadcastClientListeners = () => {
    broadcastClientRef.current.on(
      broadcastClientEventsRef.current.CONNECTION_STATE_CHANGE,
      handleConnectionStateChange
    );
    broadcastClientRef.current.on(
      broadcastClientEventsRef.current.ACTIVE_STATE_CHANGE,
      handleActiveStateChange
    );
    broadcastClientRef.current.on(
      broadcastClientEventsRef.current.ERROR,
      handleClientError
    );
  };

  const detachBroadcastClientListeners = () => {
    broadcastClientRef.current.off(
      broadcastClientEventsRef.current.CONNECTION_STATE_CHANGE,
      handleConnectionStateChange
    );
    broadcastClientRef.current.off(
      broadcastClientEventsRef.current.ACTIVE_STATE_CHANGE,
      handleActiveStateChange
    );
    broadcastClientRef.current.off(
      broadcastClientEventsRef.current.ERROR,
      handleClientError
    );
  };

  const handleActiveStateChange = (active) => {
    setIsBroadcasting(active);
  };

  const handleConnectionStateChange = (state) => {
    setConnectionState(state);
  };

  const handleClientError = (clientError) => {
    setClientErrors((prevState) => [...prevState, clientError]);
  };

  const addAudioStreamToClient = async () => {
    if (!localStageAudioStreamRef) {
      return;
    }
    console.log("adding audio stream");

    try {
      await broadcastClientRef.current.addAudioInputDevice(
        new MediaStream([localStageAudioStreamRef.current.mediaStreamTrack]),
        localStageAudioStreamRef.current.id
      );
    } catch (err) {
      console.error("error adding audio device", err);
    }
  };

  const addVideoStreamToClient = async () => {
    if (!localStageVideoStreamRef) {
      return;
    }
    console.log("adding video stream");

    try {
      await broadcastClientRef.current.addVideoInputDevice(
        new MediaStream([localStageVideoStreamRef.current.mediaStreamTrack]),
        localStageVideoStreamRef.current.id,
        { index: 0 }
      );
    } catch (err) {
      console.error("error adding video device", err);
    }
  };

  const startBroadcast = async ({ streamKey, ingestEndpoint }) => {
    let streamTimeoutId;

    try {
      toast({
        variant: "default",
        title: "Starting Broadcast",
        description: "Starting your broadcast",
      });

      setStreamPending(true);
      await addAudioStreamToClient();
      await addVideoStreamToClient();

      streamTimeoutId = setTimeout(() => {
        toast({
          variant: "default",
          title: "Stream Delay Warning",
          description:
            "Your stream is taking longer than expected to start. Please check your network settings or VPN configurations and try again.",
        });
      }, 5000);

      await broadcastClientRef.current.startBroadcast(
        streamKey,
        ingestEndpoint
      );

      clearTimeout(streamTimeoutId);
      setIsBroadcasting(true);
      startTimeRef.current = new Date();
      toast({
        variant: "default",
        title: "Broadcast is Live",
        description: "Your stream is now live! Engage with your audience.",
      });
    } catch (err) {
      clearTimeout(streamTimeoutId);

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
    }

    setStreamPending(false);
  };

  const stopBroadcast = () => {
    try {
      setStreamPending(true);

      toast({
        variant: "default",
        title: "Stopping Broadcast",
        description:
          "Initiating the process to stop the broadcast. Please wait...",
      });

      broadcastClientRef.current.stopBroadcast();
      setIsBroadcasting(false);
      startTimeRef.current = undefined;

      toast({
        variant: "default",
        title: "Broadcast Ended",
        description: "The broadcast has been successfully stopped.",
      });
    } catch (err) {
      console.error(err);
      toast({
        variant: "default",
        title: "Stream Error",
        description:
          "We encountered an issue stopping your stream. Please try again or check your connection.",
      });
    }
    setStreamPending(false);
  };

  const restartBroadcastClient = async ({ config, ingestEndpoint }) => {
    if (isBroadcasting) {
      stopBroadcast();
    }
    destroyBroadcastClient();

    broadcastClientRef.current = await createBroadcastClient({
      config,
    });
  };

  return {
    broadcastSdkRef,
    broadcastClientMounted,
    broadcastClientRef,
    connectionState,
    isBroadcasting,
    isSupported,
    streamPending,
    broadcastStartTimeRef: startTimeRef,
    broadcastErrors: clientErrors,
    addAudioStreamToClient,
    addVideoStreamToClient,
    startBroadcast,
    stopBroadcast,
    createBroadcastClient,
    destroyBroadcastClient,
    restartBroadcastClient,
  };
};
