import React from "react";
import Participant from "../ParticipantsVideos/FeaturedParticipantVideo";
import AnnoBoard from "../AnnoBoard";

const ScreenSharingView = ({
  activeScreenSharer,
  rawSWidth,
  rawSHeight,
  isInitializeComplete,
  containerRef,
  whiteboarding,
  noteboarding,
}) => (
  <div className="h-[65%] w-full flex-grow">
    <div
      className="flex w-full h-[100%] items-end justify-center"
      ref={containerRef}
    >
      <div
        className="text-2xl w-full bg-gray-100  flex items-center justify-center"
        style={{ height: rawSHeight }}
      >
        {!!activeScreenSharer && (
          <>
            {!whiteboarding ? (
              <ParticipantComponent
                participantInfo={activeScreenSharer}
                width={rawSWidth}
                height={rawSHeight}
                isInitializeComplete={isInitializeComplete}
              />
            ) : (
              <AnnoBoard
                width={rawSWidth}
                height={rawSHeight}
                screenSharer={activeScreenSharer}
                whiteboarding={whiteboarding}
                noteboarding={noteboarding}
              />
            )}
          </>
        )}
      </div>
    </div>
  </div>
);

const ParticipantComponent = ({
  participantInfo,
  width,
  height,
  isInitializeComplete,
}) => {
  return (
    <Participant
      participantInfo={participantInfo}
      width={width}
      height={height}
      isInitializeComplete={isInitializeComplete}
    />
  );
};
export default ScreenSharingView;
