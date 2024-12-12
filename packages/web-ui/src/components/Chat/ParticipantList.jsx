import { useContext, useState } from "react";
import {
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Send,
  EllipsisVertical,
  GraduationCap,
  Megaphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import { CaretSortIcon, Cross2Icon } from "@radix-ui/react-icons";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import TooltipComponent from "../Tooltip";
import { StageLayoutContext } from "../../providers/StageLayoutContext";
import { UserSettingsContext } from "../../providers/UserSettingsContext";
import ParticipantOptions from "./ParticipantsOptions";
import { FEATURES, hasAccess } from "../../constants";

export function ParticipantList({
  participants,
  stageParticipants,
  mode,
  moderator,
  toggleParticipantAudio,
  toggleParticipantVideo,
  inviteToStage,
  handleRemoveStageUser,
  handlePrivateMessage,
  stageOwner,
  muteAllParticipants,
  requestToUnmuteAllParticipants,
}) {
  const [open, setOpen] = useState(false);
  // const { isMicActive, isCamActive } = useContext(StageLayoutContext);
  const { username, micMuted, cameraActive, stageInfo, role } =
    useContext(UserSettingsContext);
  // const [value, setValue] = useState("");

  const localMicActive = (participant) =>
    participant.isLocal ? !micMuted : !participant.audioMuted;

  const localCamActive = (participant) =>
    participant.isLocal ? cameraActive : !participant.videoStopped;

  const stageParticipantCount = stageParticipants?.length || 0;
  const otherParticipantCount = participants?.length || 0;
  const totalParticipantCount = stageParticipantCount + otherParticipantCount;

  const renderStageParticipants = () => {
    return stageParticipants?.map((participant) => (
      <CommandItem
        key={participant.id}
        // onSelect={(currentValue) => {
        // setValue(currentValue === value ? "" : currentValue);
        // setOpen(false);
        // Handle stage participant selection
        // }}
      >
        <div className="w-full flex justify-between items-center px-2 lg:px-0">
          <div className="flex items-center">
            <span>{participant.userId}</span>
          </div>
          {moderator ? (
            <div className="flex items-center justify-end w-1/3">
              <span
                className="cursor-pointer"
                onClick={() => toggleParticipantAudio(participant.userId)}
              >
                {localMicActive(participant) ? (
                  <TooltipComponent content={"Mute"}>
                    <Mic className="text-inherit h-4 w-4 mx-2" />
                  </TooltipComponent>
                ) : (
                  <TooltipComponent content={"Unmute"}>
                    <MicOff className="text-inherit h-4 w-4 mx-2" color="red" />
                  </TooltipComponent>
                )}
              </span>
              <span
                className="cursor-pointer"
                onClick={() => toggleParticipantVideo(participant.userId)}
              >
                {localCamActive(participant) ? (
                  <TooltipComponent content={"Off Camera"}>
                    <Camera className="text-inherit h-4 w-4 mx-2" />
                  </TooltipComponent>
                ) : (
                  <TooltipComponent content={"On Camera"}>
                    <CameraOff
                      className="text-inherit h-4 w-4 mx-2"
                      color="red"
                    />
                  </TooltipComponent>
                )}
              </span>
              {username !== participant.userId ? (
                <ParticipantOptions
                  userId={participant.userId}
                  handleRemoveStageUser={handleRemoveStageUser}
                  setOpen={setOpen}
                  handlePrivateMessage={handlePrivateMessage}
                  stageInfo={stageInfo}
                />
              ) : (
                <span>
                  <GraduationCap className="text-inherit h-4 w-4 mx-2" />
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-end w-1/3">
              <span>
                {localMicActive(participant) ? (
                  <Mic className="text-inherit h-4 w-4 mx-2" />
                ) : (
                  <MicOff className="text-inherit h-4 w-4 mx-2" color="red" />
                )}
              </span>
              <span>
                {localCamActive(participant) ? (
                  <Camera className="text-inherit h-4 w-4 mx-2" />
                ) : (
                  <CameraOff
                    className="text-inherit h-4 w-4 mx-2"
                    color="red"
                  />
                )}
              </span>
              <span>
                {stageOwner === participant.userId ? (
                  <GraduationCap className="text-inherit h-4 w-4 mx-2" />
                ) : (
                  <div className="text-inherit h-4 w-4 mx-2" />
                )}
              </span>
            </div>
          )}
        </div>
      </CommandItem>
    ));
  };
  const renderOtherParticipants = () => {
    return participants?.map((participant) => (
      <CommandItem
        key={participant.value}
        value={participant.value}
        // onSelect={(currentValue) => {
        //   setValue(currentValue === value ? "" : currentValue);
        // }}
      >
        {moderator && mode === "HYBRID" ? (
          <div
            className={"group w-full flex justify-between items-center px-2"}
          >
            {participant.label}
            {hasAccess(role, "features", FEATURES.INVITE_TO_STAGE) && (
              <TooltipComponent content={"Invite to Stage"}>
                <span
                  className="cursor-pointer"
                  onClick={() => inviteToStage(participant.value)}
                >
                  <Send className="cursor-pointer hidden group-hover:block text-inherit h-4 w-4 mx-2" />
                </span>
              </TooltipComponent>
            )}
          </div>
        ) : (
          <div className={"w-full flex justify-between items-center px-2"}>
            {participant.label}
          </div>
        )}
      </CommandItem>
    ));
  };

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className={open ? "w-full rounded-none" : "w-full shadow"}
        >
          <div className="w-full flex items-center justify-between space-x-4">
            <h4 className="text-sm font-semibold">
              Participant List
              {hasAccess(role, "features", FEATURES.PARTICIPANT_LIST_COUNT) && (
                <span>{` (${totalParticipantCount})`}</span>
              )}
            </h4>
            {open ? (
              <Cross2Icon className="h-4 w-4" />
            ) : (
              <CaretSortIcon className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle</span>
          </div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="shadow rounded w-[98%]">
        <Command>
          <div className="border-2 rounded-lg m-1">
            <CommandInput placeholder="Search participant..." />
          </div>
          {hasAccess(role, "features", FEATURES.MUTE_ALL) && (
            <div className="rounded-lg m-1 flex justify-between p-1">
              <Button onClick={muteAllParticipants}>
                <div className="flex flex-col px-4 justify-center items-center cursor-pointer">
                  <MicOff className="text-inherit h-4 w-4 mx-2" color="red" />
                  <span>Mute All</span>
                </div>
              </Button>
              <Button onClick={requestToUnmuteAllParticipants}>
                <div className="flex flex-col p-4 justify-center items-center">
                  <Megaphone
                    className="text-inherit h-4 w-4 mx-2"
                    color="red"
                  />
                  <span>Request All to Unmute</span>
                </div>
              </Button>
            </div>
          )}
          <CommandList>
            <CommandEmpty>No participant joined.</CommandEmpty>
            {mode === "HYBRID" && (
              <>
                {!!stageParticipants?.length && (
                  <CommandGroup
                    heading={`Stage Participants (${stageParticipantCount})`}
                  >
                    {renderStageParticipants()}
                  </CommandGroup>
                )}
                {!!participants?.length && (
                  <CommandGroup
                    heading={`Other Participants (${otherParticipantCount})`}
                  >
                    {renderOtherParticipants()}
                  </CommandGroup>
                )}
              </>
            )}
            {mode === "CLASS" && (
              <CommandGroup>{renderStageParticipants()}</CommandGroup>
            )}

            {mode === "LIVE" && (
              <CommandGroup>{renderOtherParticipants()}</CommandGroup>
            )}
          </CommandList>
        </Command>
      </CollapsibleContent>
    </Collapsible>
  );
}
