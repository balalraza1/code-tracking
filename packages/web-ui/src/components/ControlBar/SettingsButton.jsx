import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
export function SettingsButton({ isLive, handleSettings, ...additionalProps }) {
  return (
    <Button
      variant="outline"
      onClick={handleSettings}
      {...additionalProps}
      disabled={isLive}
    >
      <Settings className="text-inherit h-4 w-4 md:h-6 md:w-6" />
    </Button>
  );
}
