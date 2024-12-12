import { useCallback, useEffect, useRef, useState } from "react";
import { unpack } from "../helpers/streamActionHelpers";
import { noop } from "../utils";

const { IVSPlayer } = window;
const {
  create: createMediaPlayer,
  isPlayerSupported,
  PlayerEventType,
  PlayerState,
} = IVSPlayer;
const { ENDED, PLAYING, READY, BUFFERING } = PlayerState;
const { ERROR, TEXT_METADATA_CUE } = PlayerEventType;

const usePlayer = ({ playbackUrl: urlToLoad, onTimedMetadataHandler = noop}) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const bufferingTimerRef = useRef(null);
  const reloadTimerRef = useRef(null);
  const reloadCountRef = useRef(0);

  const onStateChange = useCallback(() => {
    const newState = playerRef.current.getState();

    setLoading(newState !== PLAYING);
    console.log(`Player State - ${newState}`);

    if (newState === PLAYING) {
      reloadCountRef.current = 0;
    }

    if (newState === BUFFERING) {
      checkBuffering();
    } else {
      if (bufferingTimerRef.current) {
        clearTimeout(bufferingTimerRef.current);
      }
    }

    if (newState === ENDED) {
      clearTimeout(reloadTimerRef.current);
      reloadTimerRef.current = setTimeout(() => {
        reloadCountRef.current += 1;

        load(urlToLoad);
      }, 3000);
    }
  }, [urlToLoad]);

  const onError = useCallback(
    (err) => {
      console.warn(`Player Event - ERROR:`, err, playerRef.current);

      clearTimeout(reloadTimerRef.current);
      reloadTimerRef.current = setTimeout(() => {
        reloadCountRef.current += 1;

        load(urlToLoad);
      }, 3000);
    },
    [urlToLoad, reloadCountRef]
  );

   // Timed metadata event listener
   const onTimedMetadata = useCallback(
    (cue) => {
      const metadata = unpack(cue.text);

      onTimedMetadataHandler({ ...metadata, startTime: Date.now() });

      console.info(`Timed metadata:`, metadata);
    },
    []
  );

  const destroy = useCallback(() => {
    if (!playerRef.current) return;

    // remove event listeners
    playerRef.current.removeEventListener(READY, onStateChange);
    playerRef.current.removeEventListener(PLAYING, onStateChange);
    playerRef.current.removeEventListener(BUFFERING, onStateChange);
    playerRef.current.removeEventListener(TEXT_METADATA_CUE, onTimedMetadata);
    playerRef.current.removeEventListener(ENDED, onStateChange);
    playerRef.current.removeEventListener(ERROR, onError);

    // delete and nullify player
    playerRef.current.pause();
    playerRef.current.delete();
    playerRef.current = null;
    videoRef.current?.removeAttribute("src"); // remove possible stale src
  }, [onError, onStateChange, onTimedMetadata]);

  const create = useCallback(() => {
    if (!isPlayerSupported) {
      console.warn(
        "The current browser does not support the Amazon IVS player."
      );
      return;
    }

    // If a player instance already exists, destroy it before creating a new one
    if (playerRef.current) destroy();

    playerRef.current = createMediaPlayer();
    playerRef.current?.attachHTMLVideoElement(videoRef.current);

    playerRef.current.addEventListener(READY, onStateChange);
    playerRef.current.addEventListener(PLAYING, onStateChange);
    playerRef.current.addEventListener(BUFFERING, onStateChange);
    playerRef.current.addEventListener(TEXT_METADATA_CUE, onTimedMetadata);
    playerRef.current.addEventListener(ENDED, onStateChange);
    playerRef.current.addEventListener(ERROR, onError);
  }, [destroy, onError, onStateChange, onTimedMetadata]);

  const play = useCallback(() => {
    if (!playerRef.current) return;

    if (playerRef.current.isPaused()) {
      playerRef.current?.play();
    }
  }, []);

  const load = useCallback(
    (playbackUrl) => {
      if (reloadCountRef.current > 4) {
        clearTimeout(reloadTimerRef.current);
        clearTimeout(bufferingTimerRef.current);
        setLoading(false);
        console.log("Reload too many times, looks like stream offline.");
        return;
      }
      if (!playerRef.current) create();

      playerRef?.current?.load(playbackUrl);
      play();
    },
    [create, play]
  );

  useEffect(() => {
    load(urlToLoad);

    return destroy;
  }, [destroy, load, urlToLoad]);

  const checkBuffering = useCallback(() => {
    if (bufferingTimerRef.current) {
      clearTimeout(bufferingTimerRef.current);
    }

    bufferingTimerRef.current = setTimeout(() => {
      console.log("Buffering too long, attempting to reload.");
      load(urlToLoad);
    }, 10000);
  }, [load, urlToLoad]);

  return { destroy, load, loading, videoRef };
};

export default usePlayer;
