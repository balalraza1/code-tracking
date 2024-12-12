import React from "react";
import ParticipantVideos from "../ParticipantsVideos";

const ParticipantsGridView = ({
  stageJoined,
  participants,
  isInitializeComplete,
}) => {
  
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
    <div className="w-full flex-grow h-[85%] md:h-[90%]">
      {stageJoined && (
        <div className="flex w-full h-full items-center justify-center p-4">
          <div className="video-grid-container">
            <div className={`grid gap-1 grid-${uniqueParticipants.length}`}>
              <ParticipantVideos
                isInitializeComplete={isInitializeComplete}
                participants={uniqueParticipants}
                participantSize={uniqueParticipants.length}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipantsGridView;
