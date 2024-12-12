import { Radio, RotateCw } from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSessionDetails } from "../../api/session";
import { joinStage } from "../../api/stage";
import Login from "../../components/Login";
import debounce from "../../helper/debounce";
import { DialogContext } from "../../providers/ModalContext";
import { UserSettingsContext } from "../../providers/UserSettingsContext";
import usePrevious from "../../utils-hooks/usePrevious";
import StageContainer from "./StageContainer";

export default function StageSession() {
  const {
    setParticipantToken,
    username,
    authToken,
    isStageOwner,
    stageJoinedRef,
    setParticipantId,
    setStageGroupId,
    stageInfo,
    setVbgIndex,
    vbgIndex,
  } = useContext(UserSettingsContext);
  const { openDialog } = useContext(DialogContext);

  const [sessionInfo, setSessionInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { sessionId } = useParams();
  const previousSessionId = usePrevious(sessionId);
  const previousAuthToken = usePrevious(authToken);
  const redirectUrl = process.env.REACT_APP_REDIRECT_URL;

  useEffect(() => {
    function setBlurBg() {
      if (!vbgIndex) {
        setVbgIndex(999);
      }
    }
    setBlurBg();
  }, []);

  useEffect(() => {
    if (!username || !authToken) {
      openDialog({
        header: "You are not authenticated to join the session",
        description: "Please join the session using the url shared",
      });

      // Redirect after showing the dialog
      setTimeout(() => {
        window.location.href = redirectUrl; // Navigate to your login route or desired URL
      }, 3000);
    }
  }, [openDialog]);

  const debouncedGetSessionInfo = debounce(
    () => getSessionInfo(sessionId),
    500
  );

  const getSessionInfo = useCallback(
    async (sessionId) => {
      setIsLoading(true);
      try {
        const { result } = await getSessionDetails(sessionId);
        setSessionInfo(result);
        stageInfo.current = result;

        if (!stageJoinedRef.current) {
          joinStageWithToken(result.stageGroupId);
        }
      } catch (error) {
        console.error("Error fetching session info:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [isStageOwner, username]
  );

  const joinStageWithToken = useCallback(
    async (groupId) => {
      if (stageJoinedRef.current) return;

      try {
        setStageGroupId(groupId);
        const { result } = await joinStage({
          groupId,
          userId: username,
          attributes: {
            username: username,
          },
        });
        if (result?.stage?.token) {
          setParticipantToken(result.stage.token.token);
          setParticipantId(result.stage.token.participantId);
        }
      } catch (error) {
        console.error("Error joining stage:", error);
      }
    },
    [username, stageJoinedRef]
  );


  useEffect(() => {
    if (!!sessionId && sessionId !== previousSessionId || authToken !== previousAuthToken) {
      debouncedGetSessionInfo();
    }
  }, [
    sessionId,
    authToken,
    previousSessionId,
    previousAuthToken,
    debouncedGetSessionInfo,
  ]);

  const SessionMessage = ({ children }) => (
    <div className="w-full px-12">
      <div className="flex w-full shrink-0 items-center justify-center rounded-md border border-dashed p-6">
        <div className="mx-auto flex max-w-[800px] flex-col items-center justify-center text-center">
          {isLoading ? (
            <RotateCw size={32} className=" animate-spin" />
          ) : (
            <Radio size={32} />
          )}
          <p className="mb-4 mt-2 text-sm text-muted-foreground">{children}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex w-full h-full md:overflow-hidden">
      {isLoading && <SessionMessage>Loading session details...</SessionMessage>}
      {!isLoading && !sessionInfo && (
        <SessionMessage>No session details available.</SessionMessage>
      )}
      {!isLoading && sessionInfo && sessionInfo.isSessionLive === "true" && (
        <StageContainer />
      )}
      {!isLoading && sessionInfo && sessionInfo.isSessionLive !== "true" && (
        <SessionMessage>Session is no longer live.</SessionMessage>
      )}
    </div>
  );
}
