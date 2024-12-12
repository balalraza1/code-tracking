import { Button } from "@/components/ui/button";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { enableStageBroadcast, startSession } from "../../api/session";
import { createStage, startRecording } from "../../api/stage";
import { DialogContext } from "../../providers/ModalContext";
import { UserSettingsContext } from "../../providers/UserSettingsContext";
import { RotateCw } from "lucide-react";
import Switch from "../../components/Switch";
import Login from "../../components/Login";
import WaitingRoom from "../../components/WaitingRoom";

export default function Stage() {
  let navigate = useNavigate();
  const [startingClass, setStartingClass] = useState(false);
  const [isStageBroadcast, setIsStageBroadcast] = useState(false);

  const {
    setStageGroupId,
    setParticipantToken,
    setIsStageOwner,
    setSessionId,
    setSessionStartTime,
    sessionId,
    setParticipantId,
    setIngestEndpoint,
    setStreamKey,
  } = useContext(UserSettingsContext);
  const { username, authToken } = useContext(UserSettingsContext);
  const { openDialog } = useContext(DialogContext);

  const handleStartLiveClass = useCallback(async () => {
    setSessionId(""); // resetting session id before start class
    setStartingClass(true);
    try {
      const userId = username;
      const stageDataResult = await createStage({
        userId,
        attributes: {
          username: userId,
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

      if (!sessionId) {
        const sessionResult = await startSession("LiveClass", groupId);
        if (!sessionResult?.result) {
          throw new Error("Failed to start session");
        }

        const {
          sessionId: newSessionId,
          streamKey,
          ingestEndpoint,
        } = sessionResult?.result;
        // await startRecording({ sessionId: newSessionId }, "LiveClass"); // Default recording is enabled
        setSessionId(newSessionId);
        setIngestEndpoint(ingestEndpoint);
        setStreamKey(streamKey);
        setSessionStartTime(new Date());
        if (isStageBroadcast) {
          await enableStageBroadcast(newSessionId);
        }
        navigate(`/stagesession/${newSessionId}`);
      } else {
        navigate(`/stagesession/${sessionId}`);

        console.log("Session already started.");
      }
    } catch (error) {
      console.error("Error in handleStartLiveClass:", error);
    } finally {
      setStartingClass(false);
    }
  }, [navigate, sessionId, username, isStageBroadcast]);

  useEffect(() => {
    (!username || !authToken) &&
      openDialog({
        header: "Login to GoLive",
        description:
          "Sign in now to start your live broadcast. Access and adjust your streaming settings in the 'Settings' ",
        content: <Login />,
      });
  }, [openDialog]);
  
  return (
    <div className="w-full h-full">
      <WaitingRoom />
      <div className="flex w-full">
        <div className="p-8 md:p-4">
          <div className="flex flex-col gap-6 border border-dotted p-6">
            <Switch
              label="Start Live Class with Broadcast"
              onChange={(checked) => {
                setIsStageBroadcast(checked);
              }}
              defaultValue={isStageBroadcast}
            />
            <Button onClick={handleStartLiveClass} disabled={startingClass}>
              {startingClass && (
                <RotateCw className="mr-2 h-4 w-4 animate-spin" />
              )}
              {startingClass ? "Starting" : "Start"} Live Class
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
