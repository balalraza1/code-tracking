import { useToast } from "@/components/ui/use-toast";
import { useContext, useEffect, useRef, useState } from "react";

import {
  Stage,
  StageConnectionState,
  StageEvents,
} from "amazon-ivs-web-broadcast";
import { LocalMediaContext } from "../providers/LocalMediaContext.jsx";
import { UserSettingsContext } from "../providers/UserSettingsContext.jsx";
import Strategy from "../utils/StageStrategy.js";
import { sendChatEvent } from "../api/channel";

function useStageSDK() {
  const { toast } = useToast();
  const {
    localVideoDeviceId,
    localAudioDeviceId,
    setInitialDevices,
    localStageAudioStreamRef,
    localStageVideoStreamRef,
  } = useContext(LocalMediaContext);
  const { stageJoinedRef, stageInfo, isStageOwner } =
    useContext(UserSettingsContext);

  const [isInitializeComplete, setIsInitializeComplete] = useState(false);
  const [stageJoined, setStageJoined] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [localParticipant, setLocalParticipant] = useState();
  const [recodingEnabled, setRecordingEnabled] = useState([]);
  const stageRef = useRef(undefined);
  const strategyRef = useRef();

  useEffect(() => {
    const setNewDevices = async () => {
      try {
        await setInitialDevices();

        const newStrategy = new Strategy(
          localStageAudioStreamRef?.current,
          localStageVideoStreamRef?.current
        );

        newStrategy?.updateMedia(
          localStageAudioStreamRef?.current,
          localStageVideoStreamRef?.current
        );

        strategyRef.current = newStrategy;
      } catch (error) {
        console.error("Failed to set new devices:", error);
        setIsInitializeComplete(false);
      }
    };

    setNewDevices().then(() => {
      stageRef.current?.refreshStrategy();
      setIsInitializeComplete(true);
    });
  }, [localVideoDeviceId, localAudioDeviceId]);

  const handleParticipantJoin = (participantInfo) => {
    const participant = createParticipant(participantInfo);

    setParticipants((participants) => [
      ...participants.filter((p) => p.id !== participant.id),
      participant,
    ]);
  };

  const handleParticipantLeave = async (participantInfo) => {
    const eventPayload = {
      roomId: stageInfo?.current?.chatRoomArn,
      eventName: "app:USER_LEAVE",
      eventAttributes: {
        leftUsername: participantInfo?.userId,
      },
    };
    try {
      if (isStageOwner) {
        await sendChatEvent(eventPayload);
      }
    } catch (error) {
      console.error(error);
    }
    setParticipants((participants) =>
      participants.filter((p) => p.id !== participantInfo.id)
    );
  };

  const handleMediaAdded = (participantInfo, streams) => {
    const { id } = participantInfo;

    setParticipants((participants) =>
      participants.map((participant) => {
        if (participant.id === id) {
          return {
            ...participant,
            streams: [...participant.streams, ...streams],
          };
        }
        return participant;
      })
    );
  };

  const handleMediaRemoved = (participantInfo, streams) => {
    const { id } = participantInfo;

    setParticipants((participants) =>
      participants.map((participant) => {
        if (participant.id === id) {
          const newStreams = participant.streams.filter(
            (existingStream) =>
              !streams.some(
                (removedStream) => existingStream.id === removedStream.id
              )
          );
          return { ...participant, streams: newStreams };
        }
        return participant;
      })
    );
  };

  const handleParticipantMuteChange = (participantInfo) => {
    const { id } = participantInfo;

    setParticipants((participants) =>
      participants.map((participant) => {
        if (participant.id === id) {
          return { ...participant, ...participantInfo };
        }
        return participant;
      })
    );
  };

  const handleConnectionStateChange = (state) => {
    if (state === StageConnectionState.CONNECTED) {
      setStageJoined(true);
    } else if (state === StageConnectionState.DISCONNECTED) {
      setStageJoined(false);
    }
  };

  function leaveStage() {
    if (stageRef.current) {
      stageRef.current.leave();
      stageJoinedRef.current = false;
      stageRef.current = undefined;
      strategyRef.current = undefined;
    }
  }

  async function joinStage(token) {
    if (!token) {
      toast({
        variant: "default",
        title: "Token Error",
        description: "Please enter a token to join a Stage.",
      });
      return;
    }
    try {
      const stage = new Stage(token, strategyRef.current);
      stage.on(
        StageEvents.STAGE_CONNECTION_STATE_CHANGED,
        handleConnectionStateChange
      );
      stage.on(StageEvents.STAGE_PARTICIPANT_JOINED, handleParticipantJoin);
      stage.on(StageEvents.STAGE_PARTICIPANT_LEFT, handleParticipantLeave);
      stage.on(StageEvents.STAGE_PARTICIPANT_STREAMS_ADDED, handleMediaAdded);
      stage.on(
        StageEvents.STAGE_PARTICIPANT_STREAMS_REMOVED,
        handleMediaRemoved
      );
      stage.on(
        StageEvents.STAGE_STREAM_MUTE_CHANGED,
        handleParticipantMuteChange
      );

      stageRef.current = stage;
      await stageRef.current.join();

      stageJoinedRef.current = true;
    } catch (err) {
      console.error("Error joining stage", err);
      toast({
        variant: "default",
        title: "Stage Join Error",
        description: `Error joining stage: ${err.message}`,
      });
    }
  }

  return {
    joinStage,
    stageJoined,
    leaveStage,
    participants,
    localParticipant,
    setLocalParticipant,
    setParticipants,
    stageRef,
    strategyRef,
    isInitializeComplete,
    recodingEnabled,
    setRecordingEnabled,
  };
}

function createParticipant(participantInfo) {
  return {
    ...participantInfo,
    streams: [],
  };
}

function isLocalParticipant(info) {
  return info.isLocal;
}

export default useStageSDK;
