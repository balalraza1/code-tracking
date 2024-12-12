import React, { useContext } from "react";
import Chat from "../Chat";
import { AnnotationContext } from "../../providers/AnnotationContext";
import useDeviceType from "../../hooks/useDeviceType";

const StageChatPanel = ({
  participants,
  stageInfo,
  handleLeaveStage,
  handleRemoveUser,
  isStageOwner,
  stageJoined,
  handleMetadataInBroadcast,
  handleScreenShareParticipant,
  setWhiteboardActive,
  chatPanelOpen,
  toggleChatPanel,
}) => {
  const { chatRef, annotationReceiver } = useContext(AnnotationContext);
  const { isMobile, isTab } = useDeviceType();

  // Function to filter unique participants
  const getUniqueParticipants = () => {
    return participants?.filter(
      (participant, index, array) =>
        index ===
        array.findIndex(
          (p) =>
            p.participant?.id === participant.participant?.id &&
            p.userId === participant.userId
        )
    );
  };

  const uniqueParticipants = getUniqueParticipants();
  return (
    <div className={`${(isMobile || isTab) ? "w-[calc(100vw-100px)]" : "w-[calc((100vw-100px)/3)]"} ${chatPanelOpen ? " absolute top-0 bg-white z-100 " : `${(isMobile || isTab) ? "hidden" : "md:block"}`} h-full border-2 ${(isMobile || isTab) ? "" : "relative right-0"}`}>
      {stageJoined && (
        <Chat
          stageParticipants={uniqueParticipants}
          mode={
            stageInfo?.current?.isStageBroadcast === true ? "HYBRID" : "CLASS"
          }
          handleLeaveStage={handleLeaveStage}
          handleRemoveStageUser={handleRemoveUser}
          isStageOwner={isStageOwner}
          stageJoined={stageJoined}
          handleMetadataInBroadcast={handleMetadataInBroadcast}
          handleScreenShareParticipant={handleScreenShareParticipant}
          ref={chatRef}
          annotationReceiver={annotationReceiver}
          setWhiteboardActive={setWhiteboardActive}
          toggleChatPanel={toggleChatPanel}
        />
      )}
    </div>
  );
};
export default StageChatPanel;
