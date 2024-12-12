import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";

export function StreamButton({
  isLive,
  handleStream,
  loading,
  disabled,
  content,
  ...additionalProps
}) {
  const buttonStyle = isLive ? "destructive" : "outline";
  const buttonContent = isLive ? "Stop" : "Start streaming";

  return (
    <Button
      disabled={disabled}
      onClick={handleStream}
      variant={buttonStyle}
      {...additionalProps}
    >
      {loading && <RotateCw className="h-4 w-4 mr-1 md:mr-2 md:h-6 md:w-6 animate-spin" />}
      {content || buttonContent}
    </Button>
  );
}
