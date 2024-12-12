import Video from "../StageVideo";


const Participant = ({ isInitializeComplete, participantInfo, width, height }) => {
  if (!isInitializeComplete) return null;
  const { participant, streams, userId } = participantInfo;
  const username = userId ?? "Unknown";
  let streamsToDisplay = streams;
  return (
    <div key={participant?.id} style={{ width, height }} className="participants-container">
      <Video
        className="participant-video"
        participant={participantInfo}
        streamsToDisplay={streamsToDisplay}
        username={username}
      />
    </div>
  );
};

export default Participant;
