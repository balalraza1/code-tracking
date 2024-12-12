import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Copy,
  Mail,
  Play,
  Trash2,
  Plus,
  Edit,
  CheckCheckIcon,
  RotateCw,
  CircleX,
} from "lucide-react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate, useParams } from "react-router-dom";
import {
  enableStageBroadcast,
  getSessionDetails,
  startSession,
} from "../../api/session";
import { UserSettingsContext } from "../../providers/UserSettingsContext";
import {
  createStage,
  getActiveStageParticipants,
  startRecording,
} from "../../api/stage";
import { USER_ROLES } from "../../constants";
import {
  getScheduledMeeting,
  updateScheduledMeeting,
  deleteScheduledMeeting,
} from "../../api/scheduledMeetings";
import { DialogContext } from "../../providers/ModalContext";
import { useToast } from "@/components/ui/use-toast";
import { default as ConfirmationModal } from "../Logout";
import PreviewControlBar from "../ControlBar/PreviewControlBar";
import StageProvider from "../../providers/StageContext";
import { StageBroadcastProvider } from "../../providers/StageBroadcastContext";
import AnnotationProvider from "../../providers/AnnotationContext";
import VirtualBackgroundProvider from "../../providers/VirtualBackgroundContext";
import { PollProvider } from "../../providers/PollContext";
import StageLayoutProvider from "../../providers/StageLayoutContext";
import LocalMediaProvider from "../../providers/LocalMediaContext";
import StagePreview from "./StagePreview";
// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

const getMeetingStatus = (
  // currentTime,
  // startTime,
  // endTime,
  isHost,
  meetingStatus
) => {
  switch (meetingStatus) {
    case "scheduled":
      // if (currentTime < startTime) {
      return isHost
        ? "Meeting is scheduled. You can start the meeting when it's time."
        : "Meeting is scheduled. Please wait for the host to start the meeting.";
    // }
    // return "Meeting is ready to start.";

    case "started":
      // if (currentTime >= startTime && currentTime <= endTime) {
      //   return "Meeting is in progress.";
      // }
      // return "Meeting has already started, but you are out of the allowed time range.";
      return "Meeting is in progress.";

    case "ended":
      return "Meeting has ended.";

    default:
      return "";
  }
};

const Meeting = () => {
  const { meetingId } = useParams();

  const meetingUrl = window.location.href;
  const [copyStatus, setCopyStatus] = useState("");
  const [copyStatus2, setCopyStatus2] = useState("");
  const [deleteStatus, setDeleteStatus] = useState("");

  let navigate = useNavigate();
  const { openDialog, closeDialog } = useContext(DialogContext);

  const [startingClass, setStartingClass] = useState(false);
  const [joiningClass, setJoiningClass] = useState(false);

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
    username,
    authToken,
    role,
    isStageOwner,
  } = useContext(UserSettingsContext);
  const { toast } = useToast();

  const [meetingDetails, setMeetingDetails] = useState({
    topic: "",
    startTime: "",
    endTime: "",
    timezone: "",
    status: "",
    sessionId: "",
    participants: [],
    host: "",
  });

  useEffect(() => {
    if (!authToken) return;
    const fetchScheduledMeeting = async () => {
      try {
        const { result } = await getScheduledMeeting(meetingId, authToken);
        setMeetingDetails(result);
        setSessionId(result.sessionId !== "NULL" ? result.sessionId : null);
        return result;
      } catch (error) {
        console.error("Error fetching scheduled meeting:", error);
      }
    };

    if (meetingId) {
      fetchScheduledMeeting();
    }

    let counter = 0;
    const intervalId = setInterval(async () => {
      if (meetingId) {
        const response = await fetchScheduledMeeting();
        counter++;
        if ((response && response.status === "started") || counter >= 99) {
          clearInterval(intervalId);
        }
      }
    }, 10000);
    return () => clearInterval(intervalId);
  }, [meetingId, authToken]);

  const copyToClipboard = (url, setCopyStatusFn) => {
    navigator.clipboard.writeText(url);
    setCopyStatusFn("Link copied!");
    setTimeout(() => setCopyStatusFn(""), 2000);
  };

  const handleStartLiveClass = useCallback(async () => {
    // setSessionId(""); // resetting session id before start class
    setStartingClass(true);
    try {
      const userId = username;

      if (!sessionId || meetingDetails.status == "ended") {
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

        const sessionResult = await startSession("Meeting", groupId);
        if (!sessionResult?.result) {
          throw new Error("Failed to start session");
        }

        const {
          sessionId: newSessionId,
          streamKey,
          ingestEndpoint,
        } = sessionResult?.result;
        // await startRecording({ sessionId: newSessionId }, "Meeting"); // Default recording is enabled
        setSessionId(newSessionId);
        setIngestEndpoint(ingestEndpoint);
        setStreamKey(streamKey);
        setSessionStartTime(new Date());
        const payload = {
          ...meetingDetails,
          meetingId,
          status: "started",
          sessionId: newSessionId,
        };
        console.log("updateScheduledMeeting", payload);
        await updateScheduledMeeting(payload);
        window.location.href = `/stagesession/${newSessionId}`;
      } else {
        // window.location.href = `/stagesession/${meetingId}`;
        joinMeeting();
        if (role === "TEACHER") {
          setIsStageOwner(true);
        }
        console.log("Session already started.");
      }
    } catch (error) {
      console.error("Error in handleStartLiveClass:", error);
    } finally {
      setStartingClass(false);
    }
  }, [navigate, sessionId, username, meetingDetails]);

  const startMeeting = async () => {
    await handleStartLiveClass();
  };

  const joinMeeting = async () => {
    setJoiningClass(true);
    const { result } = await getSessionDetails(meetingDetails.sessionId);
    const stageParticipantsResult = await getActiveStageParticipants({
      stageArn: result?.stageGroupId,
    });

    if (
      stageParticipantsResult?.result?.participants?.find(
        (p) => p.userId === username
      )
    ) {
      openDialog({
        header: "Session In Progress",
        description: `${username} is already in the session. Please leave the previous session or join back after 10 seconds.`,
      });
      setJoiningClass(false);
      return;
    }

    window.location.href = `/stagesession/${meetingDetails.sessionId}`;
  };

  const updateMeetingDetails = () => {
    navigate("/schedule", { state: { meetingDetails } });
  };

  const deleteMeetingFn = async () => {
    try {
      await deleteScheduledMeeting(meetingId);
      closeDialog();
      setDeleteStatus("Meeting has been deleted");
      toast({
        variant: "default",
        title: "Success",
        description: "Deleted meeting successfully",
      });
    } catch (error) {
      console.error("Error deleting meeting:", error);
      toast({
        variant: "default",
        title: "Error",
        description: "Error deleting meeting. Please try again.",
      });
    }
    navigate("/");
  };

  const deleteMeeting = async () => {
    openDialog({
      header: "Delete Meeting",
      description: "Are you sure you want to delete this meeting?",
      content: (
        <ConfirmationModal onCancel={closeDialog} onConfirm={deleteMeetingFn} />
      ),
    });
  };

  const cancelMeetingFn = async () => {
    try {
      const payload = {
        ...meetingDetails,
        meetingId,
        status: "Canceled",
        sessionId: sessionId,
      };
      await updateScheduledMeeting(payload);
      closeDialog();
      setDeleteStatus("Meeting has been canceled");
      toast({
        variant: "default",
        title: "Success",
        description: "Canceled meeting successfully",
      });
    } catch (error) {
      console.error("Error canceling meeting:", error);
      toast({
        variant: "default",
        title: "Error",
        description: "Error canceling meeting. Please try again.",
      });
    }
  };

  const cancelMeeting = async () => {
    openDialog({
      header: "Cancel Meeting",
      description: "Are you sure you want to delete this meeting?",
      content: (
        <ConfirmationModal onCancel={closeDialog} onConfirm={cancelMeetingFn} />
      ),
    });
  };

  const scheduleNewMeeting = () => {
    window.location.href = "/schedule";
  };

  // const isHost = username === meetingDetails?.host;
  const isHost = role === "TEACHER";

  return (
    <LocalMediaProvider>
      <StageProvider>
        <StageBroadcastProvider>
          <AnnotationProvider>
            <VirtualBackgroundProvider>
              <StageLayoutProvider>
                <PollProvider>
                  <div className="w-full px-4 py-6 sm:px-6 md:px-8 lg:px-12">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                      <div className="space-y-1 mb-4 sm:mb-0">
                        <h2 className="text-2xl font-semibold">Meeting</h2>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-1/2">
                        <StagePreview />
                      </div>
                      <div className="w-full md:w-1/2">
                        {!!meetingId && (
                          <div className="mt-4 grid gap-4">
                            <p className="text-green-600 font-bold">
                              Meeting Scheduled!
                            </p>
                            {!!meetingDetails?.topic && (
                              <Fragment>
                                <div className="mt-2">
                                  <div className="font-semibold">
                                    <span>{meetingDetails.topic}</span>
                                    <span
                                      className={`ml-8 px-2 py-1 rounded-full text-xs ${
                                        meetingDetails.status === "started"
                                          ? "bg-green-200 text-green-800"
                                          : meetingDetails.status ===
                                            "scheduled"
                                          ? "bg-yellow-200 text-yellow-800"
                                          : "bg-red-200 text-red-800"
                                      }`}
                                    >
                                      {meetingDetails.status
                                        .charAt(0)
                                        .toUpperCase() +
                                        meetingDetails.status.slice(1)}
                                    </span>
                                  </div>
                                  <p className="text-sm mt-2">
                                    {dayjs(meetingDetails.startTime).format(
                                      "MMMM D, YYYY h:mm A"
                                    )}{" "}
                                    -{" "}
                                    {dayjs(meetingDetails.endTime).format(
                                      "h:mm A"
                                    )}{" "}
                                    ({meetingDetails.timezone})
                                  </p>
                                  <div className="mt-2 text-sm text-gray-500">
                                    {dayjs().isBefore(
                                      dayjs(meetingDetails.startTime)
                                    )
                                      ? "Starts"
                                      : "Started"}{" "}
                                    {dayjs(meetingDetails.startTime).fromNow()}
                                  </div>
                                </div>
                                {isHost && (
                                  <Fragment>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                      <Button
                                        onClick={startMeeting}
                                        disabled={startingClass}
                                      >
                                        {startingClass ? (
                                          <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                                        ) : (
                                          <Play className="mr-2 h-4 w-4" />
                                        )}
                                        {startingClass ? "Starting" : "Start"}{" "}
                                        Session
                                      </Button>
                                      <Button
                                        onClick={deleteMeeting}
                                        variant="destructive"
                                      >
                                        <CircleX className="mr-2 h-4 w-4" />
                                        Cancel Session
                                      </Button>
                                      <Button onClick={updateMeetingDetails}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Update Session
                                      </Button>
                                    </div>
                                  </Fragment>
                                )}
                                {!isHost && (
                                  <Fragment>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                      <Button
                                        onClick={joinMeeting}
                                        disabled={
                                          meetingDetails?.status !==
                                            "started" || joiningClass
                                        }
                                      >
                                        {joiningClass ? (
                                          <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                                        ) : (
                                          <Play className="mr-2 h-4 w-4" />
                                        )}
                                        {joiningClass ? "Joining" : "Join"}{" "}
                                        Session
                                      </Button>
                                    </div>
                                  </Fragment>
                                )}
                              </Fragment>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-full mt-8 text-center">
                    <p className="font-semibold text-xl">
                      {!!meetingDetails?.status &&
                        getMeetingStatus(isHost, meetingDetails?.status)}
                    </p>
                  </div>
                </PollProvider>
              </StageLayoutProvider>
            </VirtualBackgroundProvider>
          </AnnotationProvider>
        </StageBroadcastProvider>
      </StageProvider>
    </LocalMediaProvider>
  );
};
export default Meeting;
