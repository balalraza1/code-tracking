import { useContext } from "react";
import BreakoutRoom from ".";
import { Provider as StreamManagerActionsProvider } from "../../providers/StreamManagerActions";
import { DialogContext } from "../../providers/ModalContext";
import { Button } from "@/components/ui/button";
import { StageContext } from "../../providers/StageContext";
// import { useNavigate } from "react-router-dom";

export default function LeaveBreakoutRoom({ parentId, handleLeaveStage }) {
  // let navigate = useNavigate();

  const { openDialog } = useContext(DialogContext);
  // const { isBroadcasting } = useContext(StageBroadcastContext);
  const { participants: stageParticipants, leaveStage } =
    useContext(StageContext);

  const onLeaveBreakoutClick = () => {
    openDialog({
      header: "Leave this Breakout Room",
      description: "Confirm to go back to Main Class",
      content: (
        <Button
          // @ts-ignore
          type="primary"
          className="mt-6"
          variant="default"
          fullWidth={true}
          onClick={async () => {
            await handleLeaveStage();
            window.location.href = `/stagesession/${parentId}`;
          }}
        >
          Go Back to Main Class
        </Button>
      ),
    });
  };

  return <Button onClick={onLeaveBreakoutClick}>Leave Breakout Room</Button>;
}
