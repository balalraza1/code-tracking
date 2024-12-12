import { useContext } from "react";
import BreakoutRoom from ".";
import { Provider as StreamManagerActionsProvider } from "../../providers/StreamManagerActions";
import { DialogContext } from "../../providers/ModalContext";
import { Button } from "@/components/ui/button";
import { StageContext } from "../../providers/StageContext";
// import { useNavigate } from "react-router-dom";

export default function ShowBreakoutRoom({ parentId }) {
  // let navigate = useNavigate();

  const { openDialog } = useContext(DialogContext);
  // const { isBroadcasting } = useContext(StageBroadcastContext);
  const { participants: stageParticipants, leaveStage } =
    useContext(StageContext);

  // const canDisabledStartBreakoutRoom = () => {
  //   return isBroadcasting !== true;
  // };
  const onStartBreakoutRoomClick = () => {
    openDialog({
      header: "Start a Breakout Room",
      description: "Select participants to start a Breakout rooom",
      content: (
        <>
          <StreamManagerActionsProvider>
            <BreakoutRoom
              stageParticipants={stageParticipants.filter((sp) => !sp.isLocal)}
              leaveStage={leaveStage}
              // navigate={navigate}
            />
          </StreamManagerActionsProvider>
        </>
      ),
    });
  };
  const onStopBreakoutRoomClick = () => {
    openDialog({
      header: "Stop a Breakout Room",
      description: "Confirm to go back to Main Class",
      content: (
        <>
          <StreamManagerActionsProvider>
            <BreakoutRoom
              stageParticipants={stageParticipants.filter((sp) => !sp.isLocal)}
              leaveStage={leaveStage}
              parentId={parentId}
              // navigate={navigate}
            />
          </StreamManagerActionsProvider>
        </>
      ),
    });
  };

  return (
    <>
      {!!parentId ? (
        <Button
          // className="w-full"
          // disabled={canDisabledStartBreakoutRoom()}
          onClick={onStopBreakoutRoomClick}
          variant="destructive"
        >
          Stop Breakout Room
        </Button>
      ) : (
        <Button
          className="w-full"
          // disabled={canDisabledStartBreakoutRoom()}
          onClick={onStartBreakoutRoomClick}
        >
          Start a Breakout Room
        </Button>
      )}
    </>
  );
}
