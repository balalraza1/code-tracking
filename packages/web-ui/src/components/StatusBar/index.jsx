
import { useContext, useEffect, useState } from "react";
import { BroadcastContext } from "../../providers/BroadcastContext";
import { Badge } from "@/components/ui/badge";
import { Radio } from 'lucide-react';


export default function StatusBar() {
  const { isLive, broadcastStartTimeRef, connectionState } =
    useContext(BroadcastContext);
  const [timeString, setTimeString] = useState("--:--");

  useEffect(() => {
    if (!window.Worker) return;
    const timerWorker = new Worker(
      new URL("../../workers/Timer.js", import.meta.url)
    );
    if (isLive && connectionState === "connected") {
      timerWorker.postMessage({
        command: "startTimer",
        options: broadcastStartTimeRef.current || new Date(),
      });
      timerWorker.onmessage = ({ data }) => {
        setTimeString(data);
      };
    }

    return () => {
      timerWorker.postMessage("stopTimer");
      timerWorker.terminate();
    };
  }, [isLive, connectionState]);

  const statusBadge =
    isLive && connectionState === "connected" ? (
      <Badge variant="destructive">
        <Radio className="text-inherit h-3 w-3 mr-1"/>
        LIVE
      </Badge>
    ) : (
      <Badge variant="outline">OFFLINE</Badge>
    );

  const timeBadge = isLive ? (
    <Badge variant="outline">{timeString}</Badge>
  ) : (
    <></>
  );

  return (
    <div className="w-full md:h-12 gap-x-2 grow-0 shrink-0 flex justify-center items-center select-none">
      {statusBadge} {timeBadge}
    </div>
  );
}
