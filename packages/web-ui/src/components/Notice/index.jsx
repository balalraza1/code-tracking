import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useEffect, useState } from "react";
import Switch from '../../components/Switch'
import { DialogContext } from "../../providers/ModalContext";
import { useStreamManagerActions } from "../../providers/StreamManagerActions";
import { streamManager as $content } from '../../content';
import { useToast } from "../../shadcn/components/ui/use-toast";
import { sendChatEvent } from "../../api/channel";
import { UserSettingsContext } from "../../providers/UserSettingsContext";
import { useParams } from "react-router-dom";
import { getSessionDetails } from "../../api/session";


export default function Notice(noticeProps) {
  const { isLive, isBroadcasting } = noticeProps
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [sessionDetails, setSessionDetails] = useState(null);
  const [isVideoStreamNotice, setIsVideoStreamNotice] = useState(false);


  const { toast } = useToast()

  const { sendStreamAction } = useStreamManagerActions();
  const { closeDialog } = useContext(DialogContext);
  const { sessionId } = useContext(UserSettingsContext);

  const params = useParams();
  const currentSessionId = params?.sessionId || sessionId;
  
  useEffect(() => {
    const getSessionInfo = async () => {
      const result = await getSessionDetails(currentSessionId); 
      setSessionDetails(result?.result);
    }
    getSessionInfo()
  }, [])

  const sendStreamActionEvent = async (actionPayload, actionName) => {
    try {
      const { error } = await sendStreamAction(actionName, actionPayload)
      if (error) {
        toast({
          variant: "default",
          title: "Error:",
          description: $content.notifications.error.unable_to_start_stream_action,
        })
      }
      closeDialog();
    } catch (e) {
      toast({
        variant: "default",
        title: "Error:",
        description: $content.notifications.error.unable_to_start_stream_action,
      });
      closeDialog();
    }
  }

  const sendChatNoticeEvent = async (actionData) => {
    try {
      const eventPayload = {
        roomId: sessionDetails?.chatRoomArn,
        eventName: "app:NOTICE",
        eventAttributes: {...actionData, sessionId: currentSessionId},
      };

      const { result } = await sendChatEvent(eventPayload); // get from session ID
      console.info("SendEvent Success:", result);
      closeDialog();
      // return response;
    } catch (error) {
      console.error("SendEvent Error:", error);
      closeDialog();
      return error;
    }
  }
  const onClickShowNotice = async (e) => {

    if (title && message) {
      const actionName = 'notice'
      const actionData = { title, message }
      const actionPayload = { [actionName]: actionData }
      if (isVideoStreamNotice && (isLive || isBroadcasting)) {
        sendStreamActionEvent(actionPayload, actionName)
      } 
      if (isVideoStreamNotice) {
        sendChatNoticeEvent({ ...actionData, messageType: 'video' })
      } else {
        sendChatNoticeEvent({ ...actionData, messageType: 'chat' })
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="grid w-full gap-y-2">
        <Label htmlFor="Title">Title</Label>
        <Input
          id="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          defaultValue={title}
          placeholder={"Title"}
        />
      </div>

      <div className="grid w-full gap-y-2">
        <Label htmlFor="Message">Message</Label>
        <Input
          id="message"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          defaultValue={message}
          placeholder={"Message"}
        />
      </div>
      <div className="grid w-full gap-y-2">
        <Label htmlFor="chat-video-stream-toggle">Show on video stream</Label>
        <Switch id="chat-video-stream-toggle"
          defaultValue={isVideoStreamNotice}
          value={isVideoStreamNotice} onChange={(isChecked) => {
            setIsVideoStreamNotice(isChecked);
          }} />
      </div>
      <Button
        type="primary"
        variant="default"
        fullWidth={true}
        onClick={onClickShowNotice}
      >
        Show Notice
      </Button>
    </div>
  );
}
