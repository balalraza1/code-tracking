import { useContext, useEffect, useState } from "react";
import { Trash, Plus } from "lucide-react";
// import { StageContext } from "../../providers/StageContext";
import { getChatLogs } from "../../api/chat";
import { useParams } from "react-router-dom";
import { UserSettingsContext } from "../../providers/UserSettingsContext";
import { Button } from "@/components/ui/button";
import { MAX_STAGE_PARTICIPANTS } from "../../constants";
import {
  createStage,
  deleteStage,
  disconnectStage,
  // joinStage,
} from "../../api/stage";
import { sendChatEvent } from "../../api/channel";
import { endSession, startSession } from "../../api/session";
import { DialogContext } from "../../providers/ModalContext";

const BreakoutRoom = ({ stageParticipants, leaveStage, parentId = "" }) => {
  const {
    username,
    stageInfo,
    stageGroupId,
    setParticipantToken,
    setParticipantId,
    setStageGroupId,
    setIsStageOwner,
    setSessionId,
    setIngestEndpoint,
    setStreamKey,
    setSessionStartTime,
  } = useContext(UserSettingsContext);
  // const { participants: stageParticipants } = useContext(StageContext);
  const { closeDialog } = useContext(DialogContext);

  const params = useParams();

  const [currentSessionId, setCurrentSessionId] = useState("");
  useEffect(() => {
    setCurrentSessionId(currentSessionId);
  }, [params?.sessionId]);

  // State to keep track of the breakout rooms
  const [breakoutRoomParticipants, setBreakoutRoomParticipants] = useState([
    username,
  ]);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const getParticipantList = async () => {
      const chatLogsResponse = await getChatLogs(currentSessionId);

      if (!!chatLogsResponse?.result) {
        const tempParticipantList = Object.values(
          chatLogsResponse?.result?.events
        )
          ?.filter?.(
            (e: any) =>
              e.type === "EVENT" &&
              e.payload.EventName === "app:NOTIFY_ALL_USERS"
          )
          ?.slice(-1)
          ?.pop()?.payload?.Attributes?.participantList;
        setParticipants(tempParticipantList?.split(",") || []);
      }
    };
    getParticipantList();
  }, []);

  // Function to add a participant to a breakout room
  const addParticipantToBreakoutRoom = (participant) => {
    setBreakoutRoomParticipants((breakoutRoomParticipants) => {
      if (breakoutRoomParticipants.length < MAX_STAGE_PARTICIPANTS) {
        // Check if participant is already in the room
        if (!breakoutRoomParticipants.find((p) => p === participant)) {
          return [...breakoutRoomParticipants, participant];
        }
      }
    });
  };

  // Function to remove a participant from a breakout room
  const removeParticipantFromBreakoutRoom = (participant) => {
    setBreakoutRoomParticipants(
      breakoutRoomParticipants.filter((p) => p !== participant)
    );
  };

  // Function to check if a breakout room is full
  const isBreakoutRoomFull = () => {
    return breakoutRoomParticipants.length >= MAX_STAGE_PARTICIPANTS;
  };

  // Function to get available participants
  const getAvailableParticipants = () => {
    return [
      ...new Set([
        ...stageParticipants.map((sp: { userId }) => sp.userId),
        ...participants,
      ]),
    ].filter(
      (participant) => !breakoutRoomParticipants.some((p) => p === participant)
    );
  };

  const startBreakoutRoom = async (brParticipants) => {
    await leaveStage();
    await disconnectStage({
      groupId: stageGroupId,
      userId: username,
      participantId: username,
      reason: "Starting Breakout Room",
    });

    // setParticipantToken("");
    // setParticipantId("");
    // setIsStageOwner(false);
    const stageDataResult = await createStage({
      userId: username,
      attributes: {
        username,
        "featured-channel-slot": "true",
      },
    });

    if (!stageDataResult?.result) {
      throw new Error("Failed to create stage");
    }

    const { groupId, stage } = stageDataResult.result;
    setStageGroupId(groupId);
    setParticipantToken(stage.token.token);
    setParticipantId(stage.token.participantId);
    setIsStageOwner(true);

    const sessionResult = await startSession(
      "LiveClass",
      groupId,
      stageInfo.current.id
    );
    if (!sessionResult?.result) {
      throw new Error("Failed to start session");
    }
    const {
      sessionId: newSessionId,
      streamKey,
      ingestEndpoint,
    } = sessionResult?.result;
    setSessionId(newSessionId);
    setIngestEndpoint(ingestEndpoint);
    setStreamKey(streamKey);
    setSessionStartTime(new Date());

    // setSessionId(newSessionId);

    // if (isStageOwner) {
    // if (recodingEnabled) {
    //   await stopRecording({ sessionId });
    //   setRecordingEnabled(false);
    // }
    const eventPayload = {
      roomId: stageInfo?.current?.chatRoomArn,
      eventName: "app:JOIN_BREAKOUT",
      eventAttributes: {
        brParticipants: brParticipants?.join(),
        breakoutSessionId: newSessionId,
        sessionId: currentSessionId,
      },
    };
    await sendChatEvent(eventPayload);
    closeDialog();
    window.location.href = `/stagesession/${newSessionId}/parentId/${stageInfo.current.id}`;
    // }
    // if (isStageBroadcast) {
    //   await enableStageBroadcast(newSessionId);
    // }
  };

  const stopBreakoutRoom = async () => {
    await leaveStage();
    await disconnectStage({
      groupId: stageGroupId,
      userId: username,
      participantId: username,
      reason: "Stopping Breakout Room",
    });

    // setParticipantToken("");
    // setParticipantId("");
    // setIsStageOwner(false);

    // setStageGroupId(stageGroupId of parentId); // TODO
    // const { result } = await joinStage({
    //   // groupId: parentId, // TODO
    //   userId: username,
    //   attributes: {
    //     username: username,
    //     "featured-channel-slot": "true",
    //   },
    // });
    // if (result?.stage?.token) {
    //   setParticipantToken(result.stage.token.token);
    //   setParticipantId(result.stage.token.participantId);
    //   // setIsStageOwner(true);
    // }
    // if (!result) {
    //   throw new Error("Failed to join back to main session");
    // }

    // const newSessionId = result.sessionId;
    // setSessionId(newSessionId);

    // if (isStageOwner) {
    // if (recodingEnabled) {
    //   await stopRecording({ sessionId });
    //   setRecordingEnabled(false);
    // }
    const eventPayload = {
      roomId: stageInfo?.current?.chatRoomArn,
      eventName: "app:LEAVE_BREAKOUT",
      eventAttributes: { sessionId: currentSessionId },
    };
    console.log(eventPayload, "eventPayload");

    await Promise.all([
      sendChatEvent(eventPayload),
      endSession(currentSessionId),
      deleteStage({ groupId: stageGroupId }),
    ]);
    // const stageDataResult = await deleteStage({ groupId: stageGroupId });

    // if (!stageDataResult?.result) {
    //   throw new Error("Failed to delete stage");
    // }
    // window.location.href = `/stagesession/${parentId}`;
    // }
    // if (isStageBroadcast) {
    //   await enableStageBroadcast(newSessionId);
    // }
    closeDialog();
    setSessionId(parentId); // setting local storage value
    window.location.href = `/stagesession/${parentId}`;
  };

  console.log(
    stageInfo?.current?.chatRoomArn,
    "stageInfo?.current?.chatRoomArn"
  );
  if (!!parentId) {
    return (
      <Button
        type="primary"
        className="mt-6"
        variant="default"
        fullWidth={true}
        onClick={() => {
          stopBreakoutRoom();
        }}
      >
        Go Back to Main Class
      </Button>
    );
  } else {
    return (
      <div className="container mx-auto p-2">
        <div className="grid gap-4 grid-cols-2">
          <div className="border p-4 rounded-lg">
            <h4 className="mb-2 font-bold">Available Participants</h4>
            <hr className="mb-2" />
            {isBreakoutRoomFull() ? (
              <p className="text-red-500">This room is full</p>
            ) : (
              <div className="mb-2">
                {getAvailableParticipants().map((participant, index) => (
                  <div
                    key={index}
                    className="w-full flex justify-between items-center p-1"
                  >
                    <span>{participant}</span>
                    <Button
                      className="p-2 h-6"
                      onClick={() => addParticipantToBreakoutRoom(participant)}
                    >
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="border p-4 rounded-lg">
            <h4 className="mb-2 font-bold">Breakout Room</h4>
            <hr className="mb-2" />
            <div className="mb-2">
              {breakoutRoomParticipants.map((participant, index) => (
                <div
                  key={index}
                  className="w-full flex justify-between items-center p-1"
                >
                  <span>{participant}</span>
                  {participant === username ? (
                    <>(Host)</>
                  ) : (
                    <Button
                      className="p-2 h-6"
                      onClick={() =>
                        removeParticipantFromBreakoutRoom(participant)
                      }
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <Button
          type="primary"
          className="mt-6 w-full"
          variant="default"
          fullWidth={true}
          onClick={() => {
            startBreakoutRoom(breakoutRoomParticipants);
          }}
        >
          Start Breakout Room
        </Button>
      </div>
    );
  }
};

export default BreakoutRoom;
