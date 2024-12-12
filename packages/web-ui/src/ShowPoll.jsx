import { useContext } from "react";
import { Provider as StreamManagerActionsProvider } from "./providers/StreamManagerActions";
import { DialogContext } from "./providers/ModalContext";
import { Button } from "@/components/ui/button";
import { BroadcastContext } from "./providers/BroadcastContext";
import { StageBroadcastContext } from "./providers/StageBroadcastContext";
import Poll from "./components/Poll";
import { PollContext } from "./providers/PollContext";

export default function ShowPoll({ leavingStage }) {
  const { openDialog } = useContext(DialogContext);
  const { isLive } = useContext(BroadcastContext);
  const { isBroadcasting } = useContext(StageBroadcastContext);
  const { pollData } = useContext(PollContext);

  const canDisabledShowPoll = () => {
    return (
      (leavingStage === true && isBroadcasting !== true) || !!pollData?.question
    );
  };
  const onSendShowPollClick = () => {
    openDialog({
      header: "Host a live poll",
      description: "Send a poll to chat",
      content: (
        <>
          <StreamManagerActionsProvider>
            <Poll isLive={isLive} isBroadcasting={isBroadcasting} />
          </StreamManagerActionsProvider>
        </>
      ),
    });
  };

  return (
    <Button
      className="w-full"
      disabled={canDisabledShowPoll()}
      onClick={onSendShowPollClick}
    >
      {!!pollData?.question ? `Poll is in progress` : "Start a Poll"}
    </Button>
  );
}
