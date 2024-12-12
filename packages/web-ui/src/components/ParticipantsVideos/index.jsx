import Video from "../StageVideo";
import "./index.css";

const ParticipantVideos = ({ isInitializeComplete, participants }) => {
  if (!isInitializeComplete) return null;

  return (
    participants?.map((participantAndStreamInfo, index) => {
      const { participant, streams, userId } = participantAndStreamInfo;
      const username = userId ?? "Unknown";
      let streamsToDisplay = streams;
      return (
        <div
          key={participant?.id + index}
          className={`participants-container video-${index + 1}`}
        >
          <Video
            className="participant-video w-full h-full object-contain aspect-video"
            participant={participantAndStreamInfo}
            streamsToDisplay={streamsToDisplay}
            username={username}
            participantSize={index + 1}
          />
        </div>
      );
    }) ?? null
  );
};

export default ParticipantVideos;
