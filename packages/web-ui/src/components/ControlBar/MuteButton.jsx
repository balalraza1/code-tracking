import { Button } from "@/components/ui/button";
import { Mic, MicOff } from 'lucide-react';
export function MuteButton({ muted, handleMicMute, ...additionalProps }) {
  return (
    <Button variant={!muted ? "outline" : "destructOutline"} onClick={handleMicMute} {...additionalProps}>
      {!muted ? (
        <Mic className="text-inherit h-4 w-4 md:h-6 md:w-6" />
      ) : (
        <MicOff className="text-inherit h-4 w-4 md:h-6 md:w-6" />
      )}
    </Button>
  );
}
