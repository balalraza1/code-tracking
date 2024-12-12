import { Button } from "@/components/ui/button";
import { PenTool } from "lucide-react";

export function WhiteBoardShareButton({
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
      <PenTool className="text-current h-4 w-4 md:h-6 md:w-6" />
    </Button>
  );
}
