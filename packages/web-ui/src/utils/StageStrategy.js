import { SubscribeType, LocalStageStream } from "amazon-ivs-web-broadcast";

export default class Strategy {
  _videoStream = undefined;
  _audioStream = undefined;
  _subscribeType = SubscribeType?.NONE;

  constructor(
    audioStream,
    videoStream,
    subscribeType = SubscribeType?.AUDIO_VIDEO
  ) {
    this._videoStream = videoStream;
    this._audioStream = audioStream;
    this._subscribeType = subscribeType;
  }

  updateMedia(audioStream, videoStream) {
    this._audioStream = audioStream;
    this._videoStream = videoStream;
  }

  stageStreamsToPublish() {
    const streams = [];
    if (this._videoStream) {
      streams.push(this._videoStream);
    }
    if (this._audioStream) {
      streams.push(this._audioStream);
    }
    return streams;
  }

  shouldPublishParticipant(participantInfo) {
    return true;
  }

  shouldSubscribeToParticipant(participantInfo) {
    return this._subscribeType;
  }
}

export const createAudioStageStream = (stream) =>
  new LocalStageStream(stream?.getTracks()[0] || "", {
    simulcast: { enabled: true },
    // Optional: Update Max Audio Bitrate to 96Kbps. Default is 64Kbps
    maxAudioBitrateKbps: 96,

    // Signal stereo support. Note requires dual channel input source.
    stereo: true,
  });

export const createVideoStageStream = (stream) =>
  new LocalStageStream(stream?.getTracks()[0] || "", {
    // Update Max Bitrate to 1.5mbps or 1500kbps
    maxBitrate: 1500,
    // Update Max Framerate to 20fps
    maxFramerate: 20,
  });

export const createScreenShareStageStream = (stream) =>
  new LocalStageStream(stream, { simulcast: { enabled: true } });
