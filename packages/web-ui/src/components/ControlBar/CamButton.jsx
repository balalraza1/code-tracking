import { Button } from "@/components/ui/button";
import { Camera, CameraOff } from 'lucide-react';

export function CamButton({ muted, handleCameraMute, ...additionalProps }) {
  return (
    <Button
      variant={!muted ? "outline" : "destructOutline"}
      onClick={handleCameraMute}
      {...additionalProps}
    >
      {!muted ? (
        <Camera className="text-inherit h-4 w-4 md:h-6 md:w-6" />
      ) : (
        <CameraOff className="text-inherit h-4 w-4 md:h-6 md:w-6" />
      )}
    </Button>
  );
}
