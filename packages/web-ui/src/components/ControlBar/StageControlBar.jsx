import { Button } from "@/components/ui/button";
import { useCallback, useContext } from "react";
import { LocalMediaContext } from "../../providers/LocalMediaContext";
import { DialogContext } from "../../providers/ModalContext";
import { StageBroadcastContext } from "../../providers/StageBroadcastContext";
import { StageContext } from "../../providers/StageContext";
import { StageLayoutContext } from "../../providers/StageLayoutContext";
import { UserSettingsContext } from "../../providers/UserSettingsContext";
import { CamButton } from "./CamButton";
import { MuteButton } from "./MuteButton";
import { ScreenShareButton } from "./ScreenShareButton";
import { NoteBoardShareButton } from "./NoteBoardShareButton";
import { SettingsButton } from "./SettingsButton";
import { StreamButton as LeaveButton } from "./StreamButton";
import ShowBreakoutRoom from "../BreakoutRoom/ShowBreakoutRoom";
import ShowPoll from "../../ShowPoll";
import { AnnotationContext } from "../../providers/AnnotationContext";
import Settings from "../Settings";
import Tooltip from "../Tooltip";
import ShowNotice from "../Notice/ShowNotice";
import VirtualBackground from "../VirtualBackground";
import { useParams } from "react-router-dom";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Disc, EllipsisVertical, MessageSquareText } from "lucide-react";
import ShowQuiz from "../../ShowQuiz";
import LeaveBreakoutRoom from "../BreakoutRoom/LeaveBreakoutRoom";
import WhiteBoard from "../WhiteBoardPagination";
import { WhiteBoardShareButton } from "./WhiteBoardShareButton";
import { FEATURES, hasAccess } from "../../constants";
import useDeviceType from "../../hooks/useDeviceType";

export default function StageControlBar({
  leavingStage,
  handleLeaveStage,
  handleBroadcast,
  activeScreenSharer,
  toggleChatPanel,
}) {
  const { isMobile, isTab } = useDeviceType();
  const params = useParams();
  const parentId = params?.parentId || "";

  const { stageJoined, participants } = useContext(StageContext);
  const {
    permissions,
    localVideoDeviceId,
    configRef,
    streamKey,
    ingestEndpoint,
  } = useContext(LocalMediaContext);
  const { isStageOwner, micMuted, cameraActive, role, username } =
    useContext(UserSettingsContext);
  const {
    screenShareActive,
    whiteboardActive,
    toggleScreenSharing,
    toggleWhiteboarding,
    handleMicMute,
    handleCameraMute,
    noteboardActive,
    toggleNoteBoarding,
  } = useContext(StageLayoutContext);
  const {
    broadcastClientRef,
    createBroadcastClient,
    startBroadcast,
    stopBroadcast,
    isBroadcasting,
  } = useContext(StageBroadcastContext);
  const { whiteboardOwner } = useContext(AnnotationContext);
  const { openDialog } = useContext(DialogContext);
  const hasAnnotationAccess = hasAccess(
    role,
    "features",
    FEATURES.START_WHITEBOARDING
  );
  const hasScreenShareAccess = hasAccess(
    role,
    "features",
    FEATURES.START_SCREENSHARE
  );

  const handleScreenShare = useCallback(() => {
    toggleScreenSharing();
  }, [localVideoDeviceId, screenShareActive, participants]);

  const handleWhiteboard = useCallback(() => {
    toggleWhiteboarding();
  }, [localVideoDeviceId, whiteboardActive, participants]);

  const handleNoteboard = useCallback(() => {
    toggleNoteBoarding();
  }, [localVideoDeviceId, noteboardActive, participants]);

  const handleSettings = useCallback(() => {
    openDialog({
      header: "Stage Setting",
      description:
        "Adjust your device settings and save your changes in the Stage Setting section.",
      content: <Settings />,
    });
  }, [openDialog, stageJoined]);

  const StageControlsMenu = () => {
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className="rounded-md w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-white"
            aria-label="Customise options"
          >
            <Tooltip content={"Options"}>
              <EllipsisVertical className="text-inherit h-4 w-4 mx-2" />
            </Tooltip>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="z-50 min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
            sideOffset={5}
          >
            {hasAccess(role, "features", FEATURES.START_BROADCAST) &&
              !parentId && (
                <DropdownMenu.Item className="cursor-pointer group leading-none text-violet11 rounded-[3px] flex items-center px-[5px] relative py-1 select-none outline-none data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 hover:bg-lightgrey">
                  <Button
                    variant={!isBroadcasting ? "default" : "destructive"}
                    onClick={handleBroadcast}
                    className="w-full"
                  >
                    {!isBroadcasting ? "Start" : "Stop"} Broadcasting
                  </Button>
                </DropdownMenu.Item>
              )}
            {hasAccess(role, "features", FEATURES.START_BREAKOUT_ROOM) &&
              !parentId && (
                <DropdownMenu.Item className="cursor-pointer group leading-none text-violet11 rounded-[3px] flex items-center px-[5px] relative py-1 select-none outline-none data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 hover:bg-lightgrey">
                  <ShowBreakoutRoom parentId={parentId} />
                </DropdownMenu.Item>
              )}
            {hasAccess(role, "features", FEATURES.NOTICE) && (
              <DropdownMenu.Item className="cursor-pointer group leading-none text-violet11 rounded-[3px] flex items-center px-[5px] relative py-1 select-none outline-none data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 hover:bg-lightgrey">
                <ShowNotice />
              </DropdownMenu.Item>
            )}
            {hasAccess(role, "features", FEATURES.QUIZ) && (
              <DropdownMenu.Item className="cursor-pointer group leading-none text-violet11 rounded-[3px] flex items-center px-[5px] relative py-1 select-none outline-none data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 hover:bg-lightgrey">
                <ShowQuiz />
              </DropdownMenu.Item>
            )}
            {hasAccess(role, "features", FEATURES.POLL) && (
              <DropdownMenu.Item className="cursor-pointer group leading-none text-violet11 rounded-[3px] flex items-center px-[5px] relative py-1 select-none outline-none data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 hover:bg-lightgrey">
                <ShowPoll />
              </DropdownMenu.Item>
            )}
            <DropdownMenu.Arrow className="fill-white" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  };

  return (
    <div className="w-full items-center justify-center shrink-0 gap-2">
      <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-1 md:gap-2 w-full">
        <Tooltip content="Recording in progress">
          <span className="flex items-center justify-center">
            <Disc className="h-4 w-4 md:h-6 md:w-6 mr-2" color="red" />
          </span>
        </Tooltip>

        <Tooltip content={`${micMuted ? "Unmute" : "Mute"}`}>
          <span>
            <MuteButton
              muted={micMuted}
              handleMicMute={handleMicMute}
              disabled={!permissions}
            />
          </span>
        </Tooltip>
        <Tooltip content={`${cameraActive ? "Hide camera" : "Show camera"}`}>
          <span>
            <CamButton
              muted={!cameraActive}
              handleCameraMute={handleCameraMute}
              disabled={!permissions}
            />
          </span>
        </Tooltip>
        {/* 
        {isStageOwner && (
          <Tooltip
            content={`${
              noteboardActive ? "Stop Noteboarding" : "Start Noteboarding"
            }`}
          >
            <span>
              <NoteBoardShareButton
                active={noteboardActive}
                handleNoteBoard={handleNoteboard}
                disabled={!permissions}
              />
            </span>
          </Tooltip>
        )}
 */}
        {hasScreenShareAccess && !isMobile && (
          <Tooltip
            content={`${
              screenShareActive && !whiteboardActive && !noteboardActive
                ? "Stop sharing"
                : "Share your screen"
            }`}
          >
            <span>
              <ScreenShareButton
                active={
                  screenShareActive && !whiteboardActive && !noteboardActive
                }
                handleScreenShare={handleScreenShare}
                disabled={
                  !permissions ||
                  whiteboardActive ||
                  (!!activeScreenSharer &&
                    activeScreenSharer.userId !== username)
                }
              />
            </span>
          </Tooltip>
        )}
        {hasAnnotationAccess && !isMobile && (
          <Tooltip
            content={`${
              whiteboardActive ? "Stop Whiteboarding" : "Start Whiteboarding"
            }`}
          >
            <span>
              <WhiteBoardShareButton
                active={whiteboardActive}
                handleScreenShare={handleWhiteboard}
                disabled={
                  !permissions ||
                  screenShareActive ||
                  (whiteboardOwner && whiteboardOwner !== username) ||
                  (!!activeScreenSharer &&
                    activeScreenSharer.userId !== username)
                }
              />
            </span>
          </Tooltip>
        )}
        <Tooltip
          content={`${
            //  stageJoined
            //</div>? "Settings cannot be changed while stage is live.":
            "Open Setting"
          }`}
        >
          <span>
            <SettingsButton
              //   isLive={stageJoined}
              handleSettings={handleSettings}
            />
          </span>
        </Tooltip>
        <Tooltip content="Select a Virtual Background">
          <span>
            <VirtualBackground />
          </span>
        </Tooltip>
        {!parentId && (
          <LeaveButton
            loading={leavingStage}
            isLive={stageJoined}
            handleStream={handleLeaveStage}
            className="w-[100px] md:w-[200px]"
            disabled={!permissions || !stageJoined || leavingStage}
            content={
              isStageOwner
                ? `${leavingStage ? "Ending" : "End"}  Class`
                : `${leavingStage ? "Leaving" : "Leave"} Class`
            }
          />
        )}
        {(isTab || isMobile) && (
          <>
            <Tooltip content="Chat">
              <span>
                <Button
                  variant="outline"
                  onClick={toggleChatPanel}
                  disabled={!stageJoined}
                >
                  <MessageSquareText style={{ height: "20px", width: "26px" }}/>
                </Button>
              </span>
            </Tooltip>
          </>
        )}
        {hasAccess(role, "features", FEATURES.START_BREAKOUT_ROOM) &&
          !!parentId && (
            <>
              {isStageOwner ? (
                <ShowBreakoutRoom parentId={parentId} />
              ) : (
                <LeaveBreakoutRoom
                  parentId={parentId}
                  handleLeaveStage={handleLeaveStage}
                />
              )}
            </>
          )}
        {isStageOwner && <StageControlsMenu />}
      </div>
    </div>
  );
}
