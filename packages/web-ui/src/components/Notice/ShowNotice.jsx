import { useContext } from "react";
import Notice from ".";
import { Provider as StreamManagerActionsProvider } from "../../providers/StreamManagerActions";
import { DialogContext } from "../../providers/ModalContext";
import { Button } from "@/components/ui/button";
import { BroadcastContext } from "../../providers/BroadcastContext";
import { StageBroadcastContext } from "../../providers/StageBroadcastContext";

export default function ShowNotice({ leavingStage }) {
  const { openDialog } = useContext(DialogContext);
  const { isLive } = useContext(BroadcastContext);
  const { isBroadcasting } = useContext(StageBroadcastContext);

  const canDisabledShowNotice = () => {
    return leavingStage === true && isBroadcasting !== true;
  };
  const onSendShowNoticeClick = () => {
    openDialog({
      header: "Show a Notice",
      description: "Send a notice to stream or chat ",
      content: (
        <>
          <StreamManagerActionsProvider>
            <Notice isLive={isLive} isBroadcasting={isBroadcasting} />
          </StreamManagerActionsProvider>
        </>
      ),
    });
  };

  return (
    <Button
      className="w-full"
      disabled={canDisabledShowNotice()}
      onClick={onSendShowNoticeClick}
    >
      Show a Notice
    </Button>
  );
}
