import { Podcast, RotateCw } from "lucide-react";
import { memo, useCallback, useState } from "react";
import usePlayer from "../../hooks/usePlayer";
import QuizCard from "../Quiz/QuizCard";
import { useViewerStreamActions } from "../../providers/ViewerStreamActions";
import NoticeCard from "./NoticeCard";

const VideoPlayerComponent = ({ playbackUrl }) => {
  const [metadata, setMetadata] = useState({});
  const [isQuizLive, setIsQuizLive] = useState(false);
  const { setCurrentViewerAction } = useViewerStreamActions();

  const onTimedMetadataHandler = useCallback((metadata) => {
    setMetadata(metadata);
    setIsQuizLive(true)

    setTimeout(() => {
      setMetadata({});
    }, 20000);
  }, []);

  const { loading, videoRef } = usePlayer({
    playbackUrl,
  onTimedMetadataHandler
  });

  const onCloseAlertClick = () => {
    setMetadata({});
  };

  const { name, data } = metadata;
 const quizData = { ...metadata.data, startTime: metadata.startTime, setCurrentViewerAction: setCurrentViewerAction };
 const noticeData = { title: data?.title, message: data?.message };
 
  return (
    <div className="flex justify-center items-center w-full md:h-screen">
      <div className="w-full aspect-video relative p-4 flex flex-col justify-end">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          {loading ? (
            <RotateCw size={32} className="text-white animate-spin" />
          ) : (
            <Podcast className="text-white w-16 h-16" />
          )}
          <p className="text-white text-xl">
            Stream {loading ? "Loading" : "Offline"}
          </p>
        </div>
        <video
          ref={videoRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-auto"
          playsInline
        ></video>
        <div className="z-30 px-10 py-6">
          {name === "notice" && (
            <NoticeCard {...noticeData} onCloseAlertClick={onCloseAlertClick}/>
          )}
        </div>
        {name === "quiz" && isQuizLive && (
          <div className="z-30">
          <QuizCard {...quizData} setIsQuizLive={setIsQuizLive}/>
          </div>
        )}
      </div>
    </div>
  );
};

const VideoPlayer = memo(VideoPlayerComponent, (prevProps, nextProps) => {
  return prevProps.playbackUrl === nextProps.playbackUrl;
});

export default VideoPlayer;
