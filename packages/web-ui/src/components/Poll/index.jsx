import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCallback, useContext, useEffect, useState } from "react";
import { getSessionDetails, getToken } from "../../api/session";
import { DialogContext } from "../../providers/ModalContext";
import { useStreamManagerActions } from "../../providers/StreamManagerActions";
import { streamManager as $content } from "../../content";
import { useToast } from "../../shadcn/components/ui/use-toast";
import { sendChatEvent } from "../../api/channel";
import { UserSettingsContext } from "../../providers/UserSettingsContext";
import { streamManager } from "../../content";
import RadioGroupComponent from "../RadioGroup/index";
import { Slider } from "../../shadcn/components/ui/slider";
import { PollContext } from "../../providers/PollContext";

export default function Poll(pollProps) {
  const { pollData, updatePollData } = useContext(PollContext);
  const [renderResults, setRenderResults] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    options: [
      { id: 1, value: "", votes: 0, selected: false },
      { id: 2, value: "", votes: 0, selected: false },
    ],
    duration: 15,
    totalVotes: 0,
  });
  const { closeDialog } = useContext(DialogContext);
  const { sessionId } = useContext(UserSettingsContext);
  const [sessionDetails, setSessionDetails] = useState(null);

  useEffect(() => {
    if (!renderResults) {
      const getSessionInfo = async () => {
        const result = await getSessionDetails(sessionId);
        setSessionDetails(result?.result);
      };
      getSessionInfo();
    }
  }, []);

  const sendChatPollEvent = async (actionData) => {
    try {
      const eventPayload = {
        roomId: sessionDetails?.chatRoomArn,
        eventName: "app:POLL",
        eventAttributes: { ...actionData, sessionId },
      };
      const { result } = await sendChatEvent(eventPayload);
      console.info("SendEvent Success:", result);
      closeDialog();
    } catch (error) {
      console.error("SendEvent Error:", error);
      closeDialog();
      return error;
    }
  };

  const onClickShowPoll = (formData) => {
    sendChatPollEvent({
      question: formData.question,
      duration: formData.duration.toString(),
      options: JSON.stringify(formData.options),
      totalVotes: formData.totalVotes.toString(),
    });
  };

  const onCreatePoll = () => {
    updatePollData(formData);
    onClickShowPoll(formData);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="grid w-full gap-y-2">
        <Label htmlFor="Title">
          {streamManager.stream_manager_actions.poll.question}
        </Label>
        <Input
          id="question"
          defaultValue={formData.question}
          placeholder={"Question"}
          required
          onChange={({ target }) =>
            setFormData({ ...formData, question: target.value })
          }
        />
      </div>
      <RadioGroupComponent formData={formData} setFormData={setFormData} />
      <div className="flex space-x-4 items-center">
        <Slider
          max={90}
          min={0}
          className={"w-full"}
          value={[formData.duration]}
          onValueChange={(newDuration) =>
            setFormData({ ...formData, duration: newDuration })
          }
          required
        />
        <Input
          type="number"
          className="w-[92px] dark:bg-darkMode-gray-dark"
          value={[formData.duration]}
          onChange={({ target }) =>
            setFormData({ ...formData, duration: target.value })
          }
          min={0}
          max={90}
          variant="horizontal"
          autoComplete="off"
          required
        />
      </div>
      <Button
        type="primary"
        variant="default"
        fullWidth={true}
        onClick={onCreatePoll}
      >
        {streamManager.stream_manager_actions.poll.confirm_text}
      </Button>
    </div>
  );
}
