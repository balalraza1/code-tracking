import { Radio, RotateCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSessionDetails } from "../../api/session";
import VideoPlayer from "../../components/Player";
import Chat from "../../components/Chat";
import { PollProvider } from "../../providers/PollContext";

export default function LiveSession() {
  const [sessionInfo, setSessionInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  const { sessionId } = params;
  useEffect(() => {
    getSessionInfo(sessionId);
  }, [sessionId]);

  const getSessionInfo = useCallback(async () => {
    setIsLoading(true);
    try {
      let { result } = await getSessionDetails(sessionId);
      setSessionInfo(result);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId]);

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
    <div className="flex w-full h-full flex-col md:flex-row md:overflow-hidden">
      <PollProvider>
        <div className="w-full md:w-3/4 h-full flex items-center justify-center">
          {isLoading && (
            <SessionMessage>Loading session details...</SessionMessage>
          )}
          {!isLoading && !sessionInfo && (
            <SessionMessage>No session details available.</SessionMessage>
          )}
          {!isLoading &&
            sessionInfo &&
            sessionInfo.isSessionLive === "true" && (
              <VideoPlayer playbackUrl={sessionInfo?.channel?.playbackUrl} />
            )}
          {!isLoading &&
            sessionInfo &&
            sessionInfo.isSessionLive !== "true" && (
              <SessionMessage>Session is no longer live.</SessionMessage>
            )}
        </div>
        <div className="w-full md:w-1/4 h-[40vh] md:h-screen border-2 bg-white box-content relative">
          <Chat mode={sessionInfo?.isStageBroadcast ? "HYBRID" : "LIVE"} />
        </div>
      </PollProvider>
    </div>
  );
}
