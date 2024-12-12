import Video from "../StageVideo"; // Import the Video component

const LocalParticipant = ({ isInitializeComplete, participant }) => {
  if (!isInitializeComplete) return null;
  const { streams, userId } = participant;
  const username = userId ?? "Unknown";
  let streamsToDisplay = streams;
  return (
    <Video
      className="w-full h-full object-fill"
      participant={participant}
      streamsToDisplay={streamsToDisplay}
      username={username}
      key={participant?.id}
      localParticipant={true}
    />
  );
};

export default LocalParticipant;
