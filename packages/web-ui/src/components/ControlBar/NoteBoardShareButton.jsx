import { Button } from "@/components/ui/button";
import { NotebookPen } from "lucide-react";

export function NoteBoardShareButton({
  active,
  handleNoteBoard,
  ...additionalProps
}) {
  return (
    <Button
      variant={!active ? "outline" : "destructOutline"}
      onClick={handleNoteBoard}
      {...additionalProps}
    >
      <NotebookPen className="text-current h-4 w-4 md:h-6 md:w-6" />
    </Button>
  );
}
