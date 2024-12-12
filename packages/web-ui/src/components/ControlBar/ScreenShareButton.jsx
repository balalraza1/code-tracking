import { Button } from "@/components/ui/button";
import { ScreenShare ,ScreenShareOff} from 'lucide-react';

export function ScreenShareButton({
  active,
  handleScreenShare,
  ...additionalProps
}) {
  return (
    <Button
      variant={!active ? "outline" : "destructOutline"}
      onClick={handleScreenShare}
      {...additionalProps}
    >
      {active ? (
        <ScreenShareOff className="text-current h-4 w-4 md:h-6 md:w-6" />
      ) : (
        <ScreenShare className="text-current h-4 w-4 md:h-6 md:w-6" />
      )}
    </Button>
  );
}
