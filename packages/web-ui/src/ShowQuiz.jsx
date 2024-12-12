import { useContext } from "react";
import { Provider as StreamManagerActionsProvider } from "./providers/StreamManagerActions";
import { DialogContext } from "./providers/ModalContext";
import { Button } from "@/components/ui/button";
import { BroadcastContext } from "./providers/BroadcastContext";
import { StageBroadcastContext } from "./providers/StageBroadcastContext";
import QuizOrPollQuestionsComponent from "./components/Quiz/QuizOrPollQuestionsComponent";

export default function ShowQuiz({ leavingStage }) {
  const { openDialog } = useContext(DialogContext);
  const { isLive } = useContext(BroadcastContext);
  const { isBroadcasting } = useContext(StageBroadcastContext);

  const canDisabledShowQuiz = () => {
    return leavingStage === true && isBroadcasting !== true;
  };
  const onSendShowQuizClick = () => {
    openDialog({
      header: "Host a Quiz",
      description: "Send a Quiz to stream or chat ",
      content: (
        <>
          <StreamManagerActionsProvider>
            <QuizOrPollQuestionsComponent isLive={isLive} isBroadcasting={isBroadcasting} />
          </StreamManagerActionsProvider>
        </>
      ),
    });
  };

  return (
    <Button
      className="w-full"
      disabled={canDisabledShowQuiz()}
      onClick={onSendShowQuizClick}
    >
      Host a Quiz
    </Button>
  );
}
