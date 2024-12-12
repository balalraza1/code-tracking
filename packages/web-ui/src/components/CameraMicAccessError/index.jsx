import { CameraOff, MicOff } from "lucide-react";

export default function CameraMicAccessError() {
  return (
    <div className="w-full p-6">
      <div className="flex w-full shrink-0 items-center justify-center rounded-md border border-dashed p-6">
        <div className="mx-auto flex flex-col items-center justify-center text-center">
          <h3 className="mt-4 text-lg font-semibold">
            Unable to Access Camera or Microphone
          </h3>
          <div className="flex gap-4 m-6 text-red-300">
            <CameraOff size={40} />
            <MicOff size={40} />
          </div>

          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            Initialization of your camera or microphone failed, likely due to
            denied permissions or use by another application.
          </p>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            Please close any applications using these devices, verify
            permissions, and refresh to join the session.
          </p>
        </div>
      </div>
    </div>
  );
}
