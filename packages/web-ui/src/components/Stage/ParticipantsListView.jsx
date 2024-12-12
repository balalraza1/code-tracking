import React from "react";
import Participant from "../ParticipantsVideos/FeaturedParticipantVideo";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const ParticipantsListView = ({
  participants,
  rawPWidth,
  rawPHeight,
  isInitializeComplete,
  containerRef,
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
    <div className="h-1/5 w-full py-2 pl-1">
      <ScrollArea
        className="flex overflow-x-auto w-full h-full"
        ref={containerRef}
      >
        <div className="flex w-full h-full flex-nowrap space-x-2">
          {uniqueParticipants.map((participant, index) => (
            <Participant
              key={participant?.id + index}
              participantInfo={participant}
              width={rawPWidth}
              height={rawPHeight}
              isInitializeComplete={isInitializeComplete}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default ParticipantsListView;
