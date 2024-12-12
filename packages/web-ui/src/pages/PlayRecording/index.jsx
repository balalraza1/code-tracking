import ReactPlayer from "react-player";
import { useSearchParams } from "react-router-dom";

export default function PlayRecording() {
  const [searchParams] = useSearchParams();
  const recordingUrl = searchParams?.get("recordingUrl");
  // const sampleUrl ='https://d1h38nmx0ltkh3.cloudfront.net/ivs/v1/985105535842/M1e4jrtpfL5K/2024/4/18/12/4/ZlQWfmgxBkj7/media/hls/master.m3u8'
  const sampleUrl =
    "https://d1h38nmx0ltkh3.cloudfront.net/ivs/v1/985105535842/M1e4jrtpfL5K/2024/4/17/10/36/NfsH2aaAgE0D/media/hls/master.m3u8";
  // const sampleUrl = 'https://d1h38nmx0ltkh3.cloudfront.net/ivs/v1/985105535842/M1e4jrtpfL5K/2024/4/17/10/45/IM8fZ6isHDDU/media/hls/master.m3u8'
  // const sampleUrl ='https://d1h38nmx0ltkh3.cloudfront.net/ivs/v1/985105535842/M1e4jrtpfL5K/2024/4/17/10/27/IJZGWLd6ZLC1/media/hls/master.m3u8'
  // const sampleUrl = "https://d1h38nmx0ltkh3.cloudfront.net/ivs/v1/985105535842/ZiGhlBmRilxj/2024/4/23/11/26/oxqWvh2FqPvC/media/hls/master.m3u8"
  return (
    <div className="grid gap-6 m-20 justify-center">
      <ReactPlayer
        url={recordingUrl === "null" ? sampleUrl : recordingUrl}
        controls
        width="640px"
        height="360px"
        playing
      />
    </div>
  );
}
