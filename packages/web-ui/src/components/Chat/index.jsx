// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, {
  useEffect,
  useState,
  useRef,
  createRef,
  // useCallback,
  useContext,
  useCallback,
} from "react";
import Linkify from "linkify-react";
// import axios from "axios";
import {
  ChatRoom,
  DeleteMessageRequest,
  DisconnectUserRequest,
  SendMessageRequest,
} from "amazon-ivs-chat-messaging";

// Components
// import VideoPlayer from "../videoPlayer/VideoPlayer";
// import StickerPicker from "./StickerPicker";
// import RaiseHand from "./RaiseHand";

import { getChatToken, sendChatEvent } from "../../api/channel";
import { UserSettingsContext } from "../../providers/UserSettingsContext";
// import { BroadcastContext } from "../../providers/BroadcastContext";
import { useNavigate, useParams } from "react-router-dom";
import debounce from "../../helper/debounce";
// import useLocalStorage from "../../hooks/useLocalStorage";
// import useStage from "../hooks/useStage";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CircleX } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  ScanEye,
  Frown,
  PlusCircle,
  Rocket,
  Dumbbell,
  Hand,
  Eclipse,
  Smile,
  Camera,
  FileScan,
  Trash,
  Reply,
  MessageSquareOff,
  Check,
  X,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticipantList } from "./ParticipantList";
import { getSessionDetails } from "../../api/session";
import { getChatLogs } from "../../api/chat";
import { FEATURES, hasAccess } from "../../constants";
// import { LocalMediaContext } from "../../providers/LocalMediaContext";
// import { BroadcastMixerContext } from "../../providers/BroadcastMixerContext";
import { useToast } from "@/components/ui/use-toast";
import { StageLayoutContext } from "../../providers/StageLayoutContext";
import { DialogContext } from "../../providers/ModalContext";
import { AnnotationContext } from "../../providers/AnnotationContext";
import { useImperativeHandle, forwardRef } from "react";
import { ViewerPoll } from "../Poll/ViewerPoll";
import { PollContext } from "../../providers/PollContext";
import { ModeratorPoll } from "../Poll/ModeratorPoll";

import Login from "../Login";
import Tooltip from "../Tooltip";
import useDeviceType from "../../hooks/useDeviceType";

const Chat = forwardRef(
  (
    {
      stageParticipants,
      mode,
      handleLeaveStage,
      handleRemoveStageUser,
      stageJoined,
      handleMetadataInBroadcast = undefined,
      handleScreenShareParticipant = undefined,
      setWhiteboardActive = undefined,
      toggleChatPanel = undefined,
    },
    ref
  ) => {
    const { toast } = useToast();
    const { username, authToken, sessionId, setSessionId, micMuted, role } =
      useContext(UserSettingsContext);
    const { openDialog } = useContext(DialogContext);
    const { annotationReceiver, setWhiteboardOwner, setCurrentPage } =
      useContext(AnnotationContext);

    const { handleMicMute, handleCameraMute } = useContext(StageLayoutContext);
    const { pollData, updatePollData } = useContext(PollContext);
    // const { micMuted, toggleMute } = useContext(BroadcastMixerContext);
    // const { isLive } = useContext(BroadcastContext);
    let navigate = useNavigate();
    const { isMobile, isTab } = useDeviceType();

    const [moderator, setModerator] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const [chatRoom, setChatRoom] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [chatRoomToken, setChatRoomToken] = useState(
      sessionStorage.getItem("stage-token") || null
    );
    const [showRaiseHandPopup, setShowRaiseHandPopup] = useState(false);
    const [usernameRaisedHand, setUsernameRaisedHand] = useState(null);
    const [handRaised, setHandRaised] = useState(false);
    const [sessionDetails, setSessionDetails] = useState(null);
    const [pendingHandRaisedReqs, setPendingHandRaisedReqs] = useState([]);
    const [showInviteToStage, setShowInviteToStage] = useState(false);
    const [replyToMessage, setReplyToMessage] = useState(null);
    const [privateMessageToUser, setPrivateMessageToUser] = useState(null);
    const [stageOwner, setStageOwner] = useState(null);

    // const [localStorageSessionId] = useLocalStorage("sessionId");
    const previousRaiseHandUsername = useRef(null);

    const chatRef = createRef();
    const messagesEndRef = createRef();
    const chatMessagesRef = useRef([]);

    // const { participants, joinStage } = useStage();

    const handleInviteToStage = useCallback(async () => {
      setShowInviteToStage(true);
    }, []);

    const removeDuplicates = (arr) => {
      return [...new Set(arr)];
    };

    const debouncedLeaveStage = debounce(handleLeaveStage, 5000);

    const debouncedJoinBreakout = (breakoutSessionId) => {
      debouncedLeaveStage();
      setTimeout(() => {
        window.location.href = `/stagesession/${breakoutSessionId}/parentId/${sessionDetails?.id}`;
      }, 2000);
    };

    const debouncedLeaveBreakout = () => {
      debouncedLeaveStage();
      setSessionId(params?.parentId); // setting local storage value
      setTimeout(() => {
        window.location.href = `/stagesession/${params?.parentId}`;
      }, 2000);
    };

    const tokenProvider = async (chatRoomOwner, isModerator, avatarUrl) => {
      // const uuid = uuidv4();
      // const permissions = ["SEND_MESSAGE", "VIEW_MESSAGE"];

      // backend work
      // const data = {
      //   arn: config.CHAT_ROOM_ID, // get from session ID
      //   userId: `${chatRoomOwner}.${uuid}`, // get from decode jwt token
      //   attributes: {
      //     username: `${chatRoomOwner}`, // get from decode jwt token
      //     // avatar: `${avatarUrl.src}`, // ignore
      //   },
      //   capabilities: permissions,
      // };

      var token;
      try {
        const { result } = await getChatToken(chatRoomOwner, isModerator); // get from session ID
        token = {
          token: result.token,
          sessionExpirationTime: new Date(result.sessionExpirationTime),
          tokenExpirationTime: new Date(result.tokenExpirationTime),
        };
        setChatRoomToken(token?.token);
        handleUserJoin(username);
        // joinStage(token);
      } catch (error) {
        console.error("Error:", error);
      }

      return token;
    };

    // // Fetches a chat token
    // const tokenProvider = async (chatRoomOwner, isModerator, avatarUrl) => {
    //   const uuid = uuidv4();
    //   const permissions = isModerator
    //     ? ["SEND_MESSAGE", "DELETE_MESSAGE", "DISCONNECT_USER"]
    //     : ["SEND_MESSAGE"];

    //   const data = {
    //     arn: config.CHAT_ROOM_ID,
    //     userId: `${chatRoomOwner}.${uuid}`,
    //     attributes: {
    //       username: `${chatRoomOwner}`,
    //       avatar: `${avatarUrl.src}`,
    //     },
    //     capabilities: permissions,
    //   };

    //   var token;
    //   try {
    //     // const response = ""; //await axios.post(`${config.API_URL}/auth`, data);
    //     const response = requestChatToken("Student2");
    //     token = {
    //       token: response.data.token,
    //       sessionExpirationTime: new Date(response.data.sessionExpirationTime),
    //       tokenExpirationTime: new Date(response.data.tokenExpirationTime),
    //     };
    //     setChatRoomToken(token?.token);
    //     handleUserJoin(chatRoomOwner);
    //     // joinStage(token);
    //   } catch (error) {
    //     console.error("Error:", error);
    //   }

    //   return token;
    // };

    const params = useParams();
    const currentSessionId = params?.sessionId || sessionId;
    const enterChatRoom = (chatRoomArn, isModerator = false, avatarUrl) => {
      // Set application state
      // setUsername(chatRoomOwner);

      setModerator(isModerator);

      // Instantiate a chat room
      const room = new ChatRoom({
        regionOrUrl: process.env.REACT_APP_CHAT_REGION || "us-east-1",
        maxReconnectAttempts: 3,
        tokenProvider: () => tokenProvider(chatRoomArn, isModerator, avatarUrl),
      });
      setChatRoom(room);

      // Connect to the chat room
      room.connect();
    };

    const loginFn = useCallback(() => {
      (!username || !authToken) &&
        openDialog({
          header: "Login to Chat",
          description:
            "Sign in now to start participating in the live broadcast. 'Raise a Hand' to join the stage ",
          content: <Login />,
        });
    }, [openDialog]);

    useEffect(() => {
      if (!sessionDetails) {
        return;
      }
      enterChatRoom(
        sessionDetails?.chatRoomArn,
        sessionDetails?.username === username
      );
    }, [sessionDetails, authToken]);

    useEffect(() => {
      if (!currentSessionId) {
        return;
      }
      const getData = async () => {
        const sessionDetailsResponse = await getSessionDetails(
          currentSessionId
        );
        setSessionDetails(sessionDetailsResponse?.result);

        // To get chat history
        const chatLogsResponse = await getChatLogs(currentSessionId);

        if (!!chatLogsResponse?.result) {
          const chatEventsArray = Object.values(
            chatLogsResponse?.result?.events
          );

          // To filter out deleted messages from chat history
          const deletedMessageIds = chatEventsArray
            ?.filter?.(
              (e) =>
                e.type === "EVENT" &&
                e.payload.EventName === "aws:DELETE_MESSAGE"
            )
            .map((m) => m.payload.Attributes.MessageId);

          setMessages(
            chatEventsArray
              ?.filter?.(
                (e) =>
                  e.type === "MESSAGE" &&
                  !deletedMessageIds.includes(e.payload.Id) &&
                  e.payload?.Attributes?.type !== "app:Annotations"
              )
              .map?.((m) => ({
                type: "MESSAGE",
                timestamp: m.payload.SendTime,
                username: m.payload.Sender.UserId,
                userId: m.payload.Sender.UserId,
                avatar: "",
                message: m.payload.Content,
                attributes: m.payload.Attributes,
                messageId: m.payload.Id,
              }))
          );

          // To set participant list from chat history
          const tempParticipantList = chatEventsArray
            ?.filter?.(
              (e) =>
                e.type === "EVENT" &&
                e.payload.EventName === "app:NOTIFY_ALL_USERS"
            )
            ?.slice(-1)
            ?.pop()?.payload?.Attributes?.participantList;
          notifyAllUsers(tempParticipantList);

          // To set screenSharer from chat history
          const screenSharer = chatEventsArray
            ?.filter?.(
              (e) =>
                e.type === "EVENT" &&
                e.payload.EventName === "app:SCREENSHARE_STARTED"
            )
            ?.slice(-1)
            ?.pop()?.payload?.Attributes?.screenSharer;
          handleScreenShareParticipant &&
            handleScreenShareParticipant(screenSharer);
        }
      };
      getData();
    }, [currentSessionId]);

    useEffect(() => {
      // If chat room listeners are not available, do not continue
      if (!chatRoom.addListener) {
        return;
      }

      const unsubscribeOnConnected = chatRoom.addListener("connect", () => {
        // Connected to the chat room.
        renderConnect();
      });

      const unsubscribeOnDisconnected = chatRoom.addListener(
        "disconnect",
        (reason) => {
          handleUserLeave(username);
          // Disconnected from the chat room.
        }
      );

      const unsubscribeOnUserDisconnect = chatRoom.addListener(
        "userDisconnect",
        (disconnectUserEvent) => {
          handleUserLeave(username);
          /* Example event payload:
           * {
           *   id: "AYk6xKitV4On",
           *   userId": "R1BLTDN84zEO",
           *   reason": "Spam",
           *   sendTime": new Date("2022-10-11T12:56:41.113Z"),
           *   requestId": "b379050a-2324-497b-9604-575cb5a9c5cd",
           *   attributes": { UserId: "R1BLTDN84zEO", Reason: "Spam" }
           * }
           */
          renderDisconnect(disconnectUserEvent.reason);
        }
      );

      const unsubscribeOnConnecting = chatRoom.addListener("connecting", () => {
        // Connecting to the chat room.
      });

      const unsubscribeOnMessageReceived = chatRoom.addListener(
        "message",
        (message) => {
          // Received a message
          const messageType = message.attributes?.message_type || "MESSAGE";
          switch (messageType) {
            case "STICKER":
              handleSticker(message);
              break;
            default:
              handleMessage(message);
              break;
          }
        }
      );

      const unsubscribeOnEventReceived = chatRoom.addListener(
        "event",
        (event) => {
          // Received an event
          console.log("Recieved chat event:", event);
          handleEvent(event, participants, pollData);
        }
      );

      const unsubscribeOnMessageDeleted = chatRoom.addListener(
        "messageDelete",
        (deleteEvent) => {
          // Received message delete event
          const messageIdToDelete = deleteEvent.messageId;
          setMessages((prevState) => {
            // Remove message that matches the MessageID to delete
            const newState = prevState.filter(
              (item) => item.messageId !== messageIdToDelete
            );
            return newState;
          });
        }
      );

      return () => {
        unsubscribeOnConnected();
        unsubscribeOnDisconnected();
        unsubscribeOnUserDisconnect();
        unsubscribeOnConnecting();
        unsubscribeOnMessageReceived();
        unsubscribeOnEventReceived();
        unsubscribeOnMessageDeleted();
      };
    }, [chatRoom, participants, annotationReceiver]);

    // useEffect(() => {
    //   const scrollToBottom = () => {
    //     messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    //   };
    //   scrollToBottom();
    // });

    useEffect(() => {
      previousRaiseHandUsername.current = usernameRaisedHand;
    }, [usernameRaisedHand]);

    // Handlers
    const handleError = (data) => {
      const username = "";
      const userId = "";
      const avatar = "";
      const message = `${
        data.errorCode === 404 ? "Chat has ended" : "Error sending message"
      }`;
      const messageId = "";
      const timestamp = `${Date.now()}`;

      const newMessage = {
        type: "ERROR",
        timestamp,
        username,
        userId,
        avatar,
        message,
        messageId,
      };

      setMessages((prevState) => {
        return [...prevState, newMessage];
      });
    };

    const handleMessage = useCallback(
      (data) => {
        const senderUsername = data.sender.attributes.displayName;
        const senderUserId = data.sender.userId;
        const avatar = data.sender.attributes.avatar;
        const message = data.content;
        const messageId = data.id;
        const timestamp = data.sendTime;
        const attributes = data.attributes;

        if (attributes?.type === "app:Annotations") {
          annotationReceiver(message);
        } else if (
          !attributes ||
          !attributes?.privateMessageToUser ||
          attributes?.privateMessageToUser === username ||
          username === senderUsername
        ) {
          //if it is a private message, display only to the sender and only to the receiver
          const newMessage = {
            type: "MESSAGE",
            timestamp,
            username: senderUsername,
            userId: senderUserId,
            avatar,
            message,
            messageId,
            attributes,
          };

          setMessages((prevState) => {
            return [...prevState, newMessage];
          });
        }
      },
      [annotationReceiver]
    );

    const showToast = (notificationTitle, description) => {
      micMuted &&
        toast({
          variant: "default",
          title: notificationTitle,
          description: description,
        });
    };

    const handleEvent = async (event, participants, currentPollData) => {
      const { eventName, attributes } = event;
      const {
        userId = undefined,
        joinedUsername = undefined,
        participantList = undefined,
        leftUsername = undefined,
        removedUsername = undefined,
        screenSharer = undefined,
        brParticipants = undefined,
        breakoutSessionId = undefined,
        messageType = undefined,
        message = undefined,
        title = undefined,
        question = undefined,
        duration = undefined,
        options = undefined,
        totalVotes = undefined,
        pollData = undefined,
        notificationTitle = undefined,
        description = undefined,
      } = attributes;
      switch (eventName) {
        case "aws:DELETE_MESSAGE":
          // Ignore system delete message events, as they are handled
          // by the messageDelete listener on the room.
          break;
        case "app:DELETE_BY_USER":
          const userIdToDelete = event.attributes.userId;
          setMessages((prevState) => {
            // Remove message that matches the MessageID to delete
            const newState = prevState.filter(
              (item) => item.userId !== userIdToDelete
            );
            return newState;
          });
          break;
        case "app:USER_AUDIO_TOGGLE":
          if (username === userId) {
            await handleMicMute();
          }
          break;
        case "app:USER_VIDEO_TOGGLE":
          if (username === userId) {
            await handleCameraMute();
          }
          break;
        case "app:INVITE_TO_STAGE":
          if (username === userId) {
            handleInviteToStage();
          }
          break;
        case "app:ACCEPT_INVITE_TO_STAGE":
          if (moderator) {
            renderAcceptedInviteMod(userId);
          }
          break;
        case "app:DECLINE_INVITE_TO_STAGE":
          if (moderator) {
            renderDeclinedInviteMod(userId);
          }
          break;
        case "app:RAISE_HAND_TO_JOIN_STAGE":
          if (moderator) {
            setPendingHandRaisedReqs((curr) => [...new Set([...curr, userId])]);
          }
          break;
        case "app:LOWER_HAND_TO_JOIN_STAGE":
          if (moderator) {
            setPendingHandRaisedReqs((curr) =>
              curr.filter((c) => c !== userId)
            );
          }
          break;
        case "app:ACCEPT_RAISE_HAND_REQUEST":
          if (username === userId) {
            renderAcceptedHandRaise();
          }
          break;
        case "app:DECLINE_RAISE_HAND_REQUEST":
          if (username === userId) {
            renderDeclinedHandRaise();
          }
          break;
        case "app:CLASS_ENDED":
          if (!moderator) {
            toast({
              variant: "default",
              title: "Class Ended",
              description:
                "The class has been officially concluded by the instructor, and all participants will be automatically exited from the session.",
            });
            debouncedLeaveStage();
          }
          break;

        case "app:USER_JOIN":
          if (moderator) {
            let list = [];
            const tempList = participants;
            if (participants) {
              if (!tempList.includes(joinedUsername)) {
                setParticipants([...tempList, joinedUsername]);
                list = [...tempList, joinedUsername];
              }
            } else {
              setParticipants([username, joinedUsername]);
              list = [username, joinedUsername];
            }
            notifyAllUsers(list);
          }
          break;

        case "app:USER_LEAVE":
          if (moderator) {
            const tempList = participants.filter(
              (item) => item !== leftUsername
            );
            setParticipants(tempList);
            notifyAllUsers(tempList);
          }
          break;
        case "app:NOTIFY_ALL_USERS":
          const list =
            participantList.length > 0 ? participantList.split(",") : [];
          setParticipants(removeDuplicates(list) || []);
          setStageOwner(event.attributes.stageOwner);
          break;
        case "app:NOTICE":
          if (messageType === "chat") {
            renderNotice({ message, title });
          }
          if (messageType === "video") {
            handleMetadataInBroadcast &&
              handleMetadataInBroadcast(event, participants);
          }
          break;
        case "app:QUIZ":
          handleMetadataInBroadcast &&
            handleMetadataInBroadcast(event, participants);
          break;
        case "app:POLL":
          // updatePollData({ ...pollData, question, duration, options })
          renderPoll({
            question,
            duration,
            options,
            totalVotes,
            currentPollData,
          });
          break;
        case "app:SUBMIT_VOTE":
          updatePollData(JSON.parse(pollData));
          break;
        case "app:END_POLL":
          const emptyPollData = {
            question: "",
            options: [
              { id: 1, value: "", votes: 0, selected: false },
              { id: 2, value: "", votes: 0, selected: false },
            ],
            duration: 15,
            totalVotes: 0,
          };
          updatePollData(emptyPollData);
          break;
        case "app:REMOVE_USER_FROM_STAGE":
          if (username === removedUsername && !moderator) {
            removeUser(removedUsername);
          }
          break;
        case "app:JOIN_BREAKOUT":
          if (!moderator && brParticipants?.split(",")?.includes(username)) {
            toast({
              variant: "default",
              title: "Joining Breakout Room",
              description:
                "You will be automatically taken to the breakout session.",
            });
            debouncedJoinBreakout(breakoutSessionId);
          }
          break;
        case "app:LEAVE_BREAKOUT":
          toast({
            variant: "default",
            title: "Leaving Breakout Room",
            description:
              "You will be automatically taken back to the main session.",
          });
          debouncedLeaveBreakout();
          break;
        case "app:SCREENSHARE_STARTED":
          handleScreenShareParticipant(screenSharer);
          break;
        case "app:SCREENSHARE_STOPPED":
          handleScreenShareParticipant();
        case "app:SHOW_NOTIFICATION":
          showToast(notificationTitle, description);
          break;

        case "app:WHITEBOARD_STARTED":
          setWhiteboardActive(true);
          setWhiteboardOwner(event.attributes.userId);
          handleScreenShareParticipant(screenSharer);

          break;
        case "app:WHITEBOARD_STOPPED":
          setWhiteboardActive(false);
          setWhiteboardOwner(null);
          handleScreenShareParticipant();

          break;
        case "app:PAGE_CHANGE":
          setCurrentPage(event.attributes.page);
          break;
        default:
          console.info("Unhandled event received:", event);
      }
    };

    const handlePrivateMessage = (toUserId) => {
      setPrivateMessageToUser(toUserId);
    };

    useEffect(() => {
      scrollToBottom();
    }, [replyToMessage, messages]);

    const handleChange = (e) => {
      setMessage(e.target.value);
    };

    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        if (message) {
          sendMessage(message);
          setMessage("");
        }
      }
    };

    const handleUserJoin = async (username) => {
      try {
        const response = await sendEvent({
          eventName: "app:USER_JOIN",
          eventAttributes: {
            joinedUsername: username,
          },
        });
        return response;
      } catch (error) {
        return error;
      }
    };

    const handleUserLeave = async (username) => {
      try {
        const response = await sendEvent({
          eventName: "app:USER_LEAVE",
          eventAttributes: {
            leftUsername: username,
          },
        });
        return response;
      } catch (error) {
        return error;
      }
    };

    const notifyAllUsers = async (list) => {
      try {
        const response = await sendEvent({
          eventName: "app:NOTIFY_ALL_USERS",
          eventAttributes: {
            participantList: list.join(","),
            stageOwner: username,
          },
        });
        return response;
      } catch (error) {
        return error;
      }
    };

    const deleteMessageByUserId = async (userId) => {
      // Send a delete event
      try {
        const response = await sendEvent({
          eventName: "app:DELETE_BY_USER",
          eventAttributes: {
            userId: userId,
          },
        });
        return response;
      } catch (error) {
        return error;
      }
    };

    const handleMessageDelete = async (messageId) => {
      const request = new DeleteMessageRequest(
        messageId,
        "Reason for deletion"
      );
      try {
        await chatRoom.deleteMessage(request);
      } catch (error) {
        console.error(error);
      }
    };

    const handleUserKick = async (username) => {
      const request = new DisconnectUserRequest(
        username,
        `${username} Kicked by moderator`
      );
      try {
        const response = {
          roomId: sessionDetails?.chatRoomArn,
          eventName: "app:REMOVE_USER_FROM_STAGE",
          eventAttributes: {
            removedUsername: username, // Ensure consistency with event handler
            sessionId: currentSessionId,
          },
        };
        await sendEvent(response);
        await chatRoom.disconnectUser(request); // Disconnect the user
        await deleteMessageByUserId(username); // Delete user messages
      } catch (error) {
        console.error(error);
      }
    };

    const handleSticker = (data) => {
      const senderUsername = data.sender.attributes?.username;
      const senderUserId = data.sender.userId;
      const avatar = data.sender.attributes.avatar;
      const message = data.content;
      const sticker = data.attributes.sticker_src;
      const messageId = data.id;
      const timestamp = data.sendTime;

      const newMessage = {
        type: "STICKER",
        timestamp,
        username: senderUsername,
        userId: senderUserId,
        avatar,
        message,
        messageId,
        sticker,
      };

      setMessages((prevState) => {
        return [...prevState, newMessage];
      });
    };

    const handleStickerSend = async (sticker) => {
      const content = `Sticker: ${sticker.name}`;
      const attributes = {
        message_type: "STICKER",
        sticker_src: `${sticker.src}`,
      };
      const request = new SendMessageRequest(content, attributes);
      try {
        await chatRoom.sendMessage(request);
      } catch (error) {
        handleError(error);
      }
    };

    const sendMessage = async (message, attr) => {
      const content = `${message.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}`;

      let attributes = {};
      if (replyToMessage) {
        attributes = {
          replyToMsgId: replyToMessage.messageId,
          content: replyToMessage.message,
          username: replyToMessage.username,
        };
      }
      if (privateMessageToUser) {
        attributes["privateMessageToUser"] = privateMessageToUser;
      }
      if (attr?.type === "app:Annotations") {
        attributes["type"] = "app:Annotations";
      }

      const request = new SendMessageRequest(content, attributes);
      setReplyToMessage(null);
      try {
        await chatRoom.sendMessage(request);
      } catch (error) {
        handleError(error);
      }
    };

    const sendEvent = async (data) => {
      const eventPayload = {
        roomId: sessionDetails?.chatRoomArn,
        eventName: `${data.eventName}`,
        eventAttributes: {
          ...data.eventAttributes,
          sessionId: currentSessionId,
        },
      };

      try {
        const { result } = await sendChatEvent(eventPayload); // get from session ID
        console.info("SendEvent Success:", result);
        // return response;
      } catch (error) {
        console.error("SendEvent Error:", error);
        return error;
      }
    };

    // Renderers
    const renderErrorMessage = (errorMessage) => {
      return (
        <Alert variant="destructive" key={errorMessage.timestamp}>
          <Frown className="h-4 w-4" />
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>{errorMessage.message}</AlertDescription>
        </Alert>
      );
    };

    const renderSuccessMessage = (successMessage) => {
      return (
        <>
          <Alert variant="success" key={successMessage.timestamp}>
            <Rocket className="h-4 w-4" />
            <AlertTitle>Welcome!</AlertTitle>
            <AlertDescription>{successMessage.message}</AlertDescription>
          </Alert>
        </>
      );
    };

    const renderNoticeMessage = (successMessage) => {
      return (
        <div className="p-1">
          <Alert
            variant="success"
            className="border-2 border-black p-2 bg-black opacity-75 text-white"
          >
            <AlertTitle className="text-lg font-bold">
              {successMessage.title}
            </AlertTitle>
            <AlertDescription>
              <Linkify
                options={{
                  ignoreTags: ["script", "style"],
                  nl2br: true,
                  rel: "noopener noreferrer",
                  target: "_blank",
                }}
              >
                {successMessage.message}
              </Linkify>
            </AlertDescription>
          </Alert>
        </div>
      );
    };

    const renderPollMessage = (pollMessage) => {
      const options = JSON.parse(pollMessage.options);
      const data = {
        question: pollMessage.question,
        options,
        duration: parseInt(pollMessage.duration),
        totalVotes: parseInt(pollMessage.totalVotes),
      };

      const submitVote = async (pollData) => {
        try {
          const response = await sendEvent({
            eventName: "app:SUBMIT_VOTE",
            eventAttributes: {
              pollData: JSON.stringify(pollData),
            },
          });
          return response;
        } catch (error) {
          return error;
        }
      };
      const endPoll = async () => {
        const emptyPollData = {
          question: "",
          options: [
            { id: 1, value: "", votes: 0, selected: false },
            { id: 2, value: "", votes: 0, selected: false },
          ],
          duration: 15,
          totalVotes: 0,
        };
        try {
          const response = await sendEvent({
            eventName: "app:END_POLL",
            eventAttributes: {
              pollData: JSON.stringify(emptyPollData),
            },
          });
          return response;
        } catch (error) {
          return error;
        }
      };

      return (
        <div className="py-2 px-1">
          {moderator ? (
            <ModeratorPoll
              data={{ ...pollMessage.currentPollData, ...data }}
              endPoll={endPoll}
            />
          ) : (
            <ViewerPoll data={data} submitVote={submitVote} endPoll={endPoll} />
          )}
        </div>
      );
    };

    const renderChatLineActions = (message) => {
      return (
        <>
          {moderator && (
            <Tooltip content="Reply">
              <Button
                variant="ghost"
                size="icon"
                className="p-1 h-6"
                onClick={(e) => {
                  setReplyToMessage(message);
                  chatRef.current.focus();
                }}
              >
                <Reply size={14} />
              </Button>
            </Tooltip>
          )}
          {hasAccess(role, "features", FEATURES.DELETE_MESSAGE) &&
            (moderator || message.userId === username) && (
              <Tooltip content="Delete">
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-1 h-6"
                  onClick={(e) => {
                    e.preventDefault();
                    handleMessageDelete(message.messageId);
                  }}
                >
                  <Trash size={14} />
                </Button>
              </Tooltip>
            )}
          {moderator && message.userId !== username && (
            <Tooltip content={`Remove ${message.userId}`}>
              <Button
                variant="ghost"
                size="icon"
                className="p-1 h-6"
                onClick={(e) => {
                  e.preventDefault();
                  handleUserKick(message.userId);
                }}
              >
                <MessageSquareOff size={14} />
              </Button>
            </Tooltip>
          )}
        </>
      );
    };

    // const handleIfPrivateMsg = (message) => {
    // return (
    //   !message.attributes ||
    //   !message.attributes?.privateMessageToUser ||
    //   message.attributes?.privateMessageToUser === username ||
    //   username === message.username
    // );
    // };

    // const renderStickerMessage = (message) => (
    //   <div className="chat-line-sticker-wrapper flex" key={message.timestamp}>
    //     <div className="chat-line chat-line--sticker" key={message.timestamp}>
    //       {/* <img
    //         className="chat-line-img"
    //         src={message.avatar}
    //         alt={`Avatar for ${message.username}`}
    //       /> */}
    //       <p>
    //         <span className="username">{message.username}</span>
    //       </p>
    //       <img className="chat-sticker" src={message.sticker} alt={`sticker`} />
    //     </div>
    //     {moderator ? renderChatLineActions(message) : ""}
    //   </div>
    // );

    const renderMessage = (message) => (
      <div
        ref={(ref) => (chatMessagesRef.current[message.messageId] = ref)}
        className={
          message.username
            ? message.username === username
              ? "pl-12 pr-4 py-1"
              : "pl-2 pr-12 py-1"
            : "px-2 py-1"
        }
      >
        <div
          className={
            message.username
              ? message.username === username
                ? "p-2 bg-blue-200 rounded-md"
                : "p-2 bg-slate-200 rounded-md"
              : "bg-transparent"
          }
          key={message.id}
        >
          {message.username ? (
            <>
              <div className="flex justify-between space-x-2 pb-1">
                <div>
                  {message.username !== username && (
                    <span className="font-bold mr-1 text-sm">
                      {message.username.length > 15
                        ? `${message.username.slice(0, 12)}...`
                        : message.username}
                    </span>
                  )}
                  {!!message.attributes?.privateMessageToUser && !moderator && (
                    <span className="text-red-600 text-sm">
                      (Direct Message)
                    </span>
                  )}
                </div>
                <div className="flex">{renderChatLineActions(message)}</div>
              </div>
              {message.attributes && message.attributes.replyToMsgId && (
                <div
                  className="flex flex-row pr-2 bg-blue-50 cursor-pointer mb-1"
                  onClick={() =>
                    chatMessagesRef.current[
                      message.attributes.replyToMsgId
                    ].scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <div className="border-l-4 border-r-2 border-orange-400 mr-3" />
                  <div className="flex flex-col py-1">
                    <span className="font-bold mr-1 text-slate-500 pb-1">
                      {message.attributes.username}
                    </span>
                    <div className="flex text-slate-500">
                      {message.attributes?.content?.length > 20
                        ? message.attributes?.content?.substring(0, 20) + " ..."
                        : message.attributes?.content}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : null}
          <div
            className={`flex ${!message.username ? "items-center" : "pt-1"}`}
          >
            <p className={!message.username ? "flex-grow" : ""}>
              <Linkify
                options={{
                  ignoreTags: ["script", "style"],
                  nl2br: true,
                  rel: "noopener noreferrer",
                  target: "_blank",
                }}
              >
                {message.message}
              </Linkify>
            </p>
          </div>
        </div>
      </div>
    );

    const renderMessages = () => {
      // privateMessageToUser &&
      //   moderator &&
      //   alert(
      //     JSON.stringify(
      //       messages.filter(
      //         (message) =>
      //           message?.attributes?.privateMessageToUser ===
      //           privateMessageToUser
      //       )
      //     )
      //   );
      const messagesToShow = moderator
        ? privateMessageToUser
          ? messages.filter(
              (message) =>
                message?.attributes?.privateMessageToUser ===
                privateMessageToUser
            )
          : messages.filter(
              (message) => !message?.attributes?.privateMessageToUser
            )
        : messages.filter(
            (message) =>
              !message.attributes ||
              !message.attributes?.privateMessageToUser ||
              message.attributes?.privateMessageToUser === username ||
              username === message.username
          );
      return messagesToShow.map((message) => {
        switch (message.type) {
          case "ERROR":
            const errorMessage = renderErrorMessage(message);
            return errorMessage;
          case "SUCCESS":
            const successMessage = renderSuccessMessage(message);
            return successMessage;
          case "NOTICE":
            const noticeMessage = renderNoticeMessage(message);
            return noticeMessage;
          case "POLL":
            const pollMessage = renderPollMessage(message);
            return pollMessage;
          // case "STICKER":
          //   const stickerMessage = renderStickerMessage(message);
          // return stickerMessage;
          case "MESSAGE":
            const textMessage = renderMessage(message);
            return textMessage;
          default:
            console.info("Received unsupported message:", message);
            return <></>;
        }
      });
    };

    const renderDisconnect = (reason) => {
      const error = {
        type: "ERROR",
        timestamp: `${Date.now()}`,
        username: "",
        userId: "",
        avatar: "",
        message: `Connection closed. Reason: ${reason}`,
      };
      setMessages((prevState) => {
        return [...prevState, error];
      });
    };

    const renderConnect = () => {
      const status = {
        type: "SUCCESS",
        timestamp: `${Date.now()}`,
        username: "",
        userId: "",
        avatar: "",
        message: `Connected to the chat room.`,
      };
      setMessages((prevState) => {
        return [...prevState, status];
      });
    };

    const renderAcceptedInvite = () => {
      const status = {
        type: "SUCCESS",
        timestamp: `${Date.now()}`,
        username: "",
        userId: "",
        avatar: "",
        message: `You have joined the Stage.`,
      };
      setMessages((prevState) => {
        return [...prevState, status];
      });
    };

    const renderAcceptedInviteMod = (userId) => {
      const status = {
        type: "SUCCESS",
        timestamp: `${Date.now()}`,
        username: "",
        userId: "",
        avatar: "",
        message: `${userId} has joined the Stage.`,
      };
      setMessages((prevState) => {
        return [...prevState, status];
      });
    };

    const renderDeclinedInviteMod = (userId) => {
      const status = {
        type: "ERROR",
        timestamp: `${Date.now()}`,
        username: "",
        userId: "",
        avatar: "",
        message: `${userId} has declined the invite to join the Stage.`,
      };
      setMessages((prevState) => {
        return [...prevState, status];
      });
    };

    const renderAcceptedHandRaise = () => {
      setHandRaised(false);
      const status = {
        type: "SUCCESS",
        timestamp: `${Date.now()}`,
        username: "",
        userId: "",
        avatar: "",
        message: `The moderator has accepted your request.`,
      };
      setMessages((prevState) => {
        return [...prevState, status];
      });
      setTimeout(() => {
        navigate(`/stagesession/${sessionDetails?.id}`);
      }, 2000);
    };

    const removeUser = async () => {
      toast({
        variant: "default",
        title: "Removed from Live Collaboration",
        description:
          "You have been removed from the live class session by the host.",
      });
      setTimeout(() => {
        handleLeaveStage();
      }, 2000);
    };

    const renderDeclinedHandRaise = () => {
      setHandRaised(false);
      const status = {
        type: "ERROR",
        timestamp: `${Date.now()}`,
        username: "",
        userId: "",
        avatar: "",
        message: `The moderator has declined your request.`,
      };
      setMessages((prevState) => {
        return [...prevState, status];
      });
    };

    const isChatConnected = () => {
      const chatState = chatRoom.state;
      return chatState === "connected";
    };

    const toggleParticipantVideo = async (userId) => {
      if (userId === username) {
        await handleCameraMute();
        return;
      }
      try {
        const response = await sendEvent({
          eventName: "app:USER_VIDEO_TOGGLE",
          eventAttributes: {
            userId,
          },
        });
        return response;
      } catch (error) {
        return error;
      }
    };

    const toggleParticipantAudio = async (userId) => {
      if (userId === username) {
        await handleMicMute();
        return;
      }
      try {
        const response = await sendEvent({
          eventName: "app:USER_AUDIO_TOGGLE",
          eventAttributes: {
            userId,
          },
        });
        return response;
      } catch (error) {
        return error;
      }
    };

    const inviteToStage = async (userId) => {
      try {
        const response = await sendEvent({
          eventName: "app:INVITE_TO_STAGE",
          eventAttributes: {
            userId,
          },
        });
        return response;
      } catch (error) {
        return error;
      }
    };
    const acceptInviteToStage = async (userId) => {
      try {
        const response = await sendEvent({
          eventName: "app:ACCEPT_INVITE_TO_STAGE",
          eventAttributes: {
            userId,
          },
        });
        renderAcceptedInvite();
        setShowInviteToStage(false);
        // TODO
        navigate(`/stagesession/${sessionDetails?.id}`);
        return response;
      } catch (error) {
        return error;
      }
    };

    const declineInviteToStage = async (userId) => {
      try {
        const response = await sendEvent({
          eventName: "app:DECLINE_INVITE_TO_STAGE",
          eventAttributes: {
            userId,
          },
        });
        setShowInviteToStage(false);
        return response;
      } catch (error) {
        return error;
      }
    };

    const raiseHandToJoinStage = async (userId) => {
      setHandRaised(true);
      try {
        const response = await sendEvent({
          eventName: "app:RAISE_HAND_TO_JOIN_STAGE",
          eventAttributes: {
            userId,
          },
        });
        return response;
      } catch (error) {
        return error;
      }
    };
    const lowerHandToJoinStage = async (userId) => {
      setHandRaised(false);
      try {
        const response = await sendEvent({
          eventName: "app:LOWER_HAND_TO_JOIN_STAGE",
          eventAttributes: {
            userId,
          },
        });
        return response;
      } catch (error) {
        return error;
      }
    };

    const acceptRaisedHandRequest = async (userId) => {
      try {
        const response = await sendEvent({
          eventName: "app:ACCEPT_RAISE_HAND_REQUEST",
          eventAttributes: {
            userId,
          },
        });
        setPendingHandRaisedReqs((curr) => [
          ...new Set([...curr.filter((c) => c !== userId)]),
        ]);
        return response;
      } catch (error) {
        return error;
      }
    };

    const declineRaisedHandRequest = async (userId) => {
      try {
        const response = await sendEvent({
          eventName: "app:DECLINE_RAISE_HAND_REQUEST",
          eventAttributes: {
            userId,
          },
        });
        setPendingHandRaisedReqs((curr) => [
          ...new Set([...curr.filter((c) => c !== userId)]),
        ]);
        return response;
      } catch (error) {
        return error;
      }
    };

    const renderNotice = ({ message, title }) => {
      const status = {
        type: "NOTICE",
        timestamp: `${Date.now()}`,
        username: "",
        userId: "",
        avatar: "",
        message: message,
        title: title,
      };
      setMessages((prevState) => {
        return [...prevState, status];
      });
    };

    const renderPoll = ({
      question,
      duration,
      options,
      totalVotes,
      currentPollData,
    }) => {
      const status = {
        type: "POLL",
        question: question,
        duration: duration,
        options: options,
        totalVotes: totalVotes,
        currentPollData: currentPollData,
      };
      setMessages((prevState) => {
        return [...prevState, status];
      });
    };

    const sendAnnotations = (strokes) => {
      const attributes = {
        type: "app:Annotations",
      };
      sendMessage(strokes, attributes);
    };

    const muteAllParticipants = () => {
      stageParticipants.forEach(({ attributes, audioMuted }) => {
        if (audioMuted === false && attributes.username !== username) {
          toggleParticipantAudio(attributes.username);
        }
      });
    };

    const requestToUnmuteAllParticipants = async () => {
      await sendEvent({
        eventName: "app:SHOW_NOTIFICATION",
        eventAttributes: {
          notificationTitle: "Request to unmute",
          description: "The Host has requested you to turn on your mic",
        },
      });
    };

    useImperativeHandle(ref, () => ({
      sendAnnotations,
    }));

    return (
      <>
        <header className="absolute w-full z-50 bg-white">
          <ParticipantList
            participants={participants
              ?.filter(
                (n) => !stageParticipants?.map((s) => s.userId).includes(n)
              )
              ?.map((p) => ({
                label: p,
                value: p,
              }))}
            stageParticipants={stageParticipants}
            mode={!stageJoined ? "LIVE" : mode}
            moderator={moderator}
            toggleParticipantAudio={toggleParticipantAudio}
            toggleParticipantVideo={toggleParticipantVideo}
            inviteToStage={inviteToStage}
            handleRemoveStageUser={handleRemoveStageUser}
            handlePrivateMessage={handlePrivateMessage}
            stageOwner={stageOwner}
            requestToUnmuteAllParticipants={requestToUnmuteAllParticipants}
            muteAllParticipants={muteAllParticipants}
          />
          {privateMessageToUser && moderator ? (
            <div className="flex flex-row justify-between items-center p-2 px-4 w-full shadow bg-sky-200">
              <div className="flex flex-row gap-2">
                {`Messaging to `}
                <span className="font-semibold">{privateMessageToUser}</span>
              </div>

              <X
                size={16}
                onClick={() => setPrivateMessageToUser(null)}
                className="cursor-pointer"
              />
            </div>
          ) : null}
        </header>
        <ScrollArea className="top-[50px] h-[calc(100vh-100px)] md:h-[calc(100vh-100px)]">
          <div>
            {renderMessages()}
            {replyToMessage ? <div className="h-24" /> : null}
            <div ref={messagesEndRef} />
          </div>

          <div className={`flex flex-col gap-3 fixed bottom-6 ml-1`}>
            {pendingHandRaisedReqs.map((p) => (
              <div className="flex flex-row gap-6 items-center transform -translate-y-1/2 transition-all duration-300 translate-x-0 bg-slate-300 text-black px-4 py-2 rounded shadow-md justify-between w-full">
                <div>{p} raised their hand</div>
                <div className="flex flex-row gap-2">
                  <Button
                    className="bg-green-600 px-1 rounded hover:bg-green-500"
                    onClick={() => {
                      acceptRaisedHandRequest(p);
                    }}
                  >
                    <Check style={{ height: "20px", width: "26px" }} />
                  </Button>

                  <Button
                    className="bg-red-600 px-1 rounded hover:bg-red-500"
                    onClick={() => declineRaisedHandRequest(p)}
                  >
                    <X style={{ height: "20px", width: "26px" }} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {showInviteToStage && (
            <div className={`flex flex-col gap-3 fixed bottom-6 ml-1`}>
              <div className="flex flex-row gap-6 items-center transform -translate-y-1/2 transition-all duration-300 translate-x-0 bg-slate-300 text-black px-4 py-2 rounded shadow-md justify-between w-full">
                <div>{sessionDetails?.username} requested to join stage</div>
                <div className="flex flex-row gap-2">
                  <Button
                    className="bg-green-600 px-1 rounded hover:bg-green-500"
                    onClick={() => {
                      acceptInviteToStage(username);
                    }}
                  >
                    <Check style={{ height: "20px", width: "26px" }} />
                  </Button>
                  <Button
                    className="bg-red-600 px-1 rounded hover:bg-red-500"
                    onClick={() => {
                      declineInviteToStage(username);
                    }}
                  >
                    <X style={{ height: "20px", width: "26px" }} />
                  </Button>
                </div>
              </div>
            </div>
          )}
          <div className={`flex items-center justify-center fixed ${(isMobile || isTab) ? "px-3 w-[calc(100vw-100px)]" : "px-2 pt-2 w-[calc((100vw-100px)/4)]"} right-0 bottom-2`}>
            {(isMobile || isTab) && (
              <ArrowLeft
                style={{ height: "20px", width: "26px", textAlign: "center" }}
                onClick={toggleChatPanel}
              />
            )}
            <div className="flex w-full items-center space-x-2">
              {!authToken ? (
                <Button onClick={loginFn}>Login to Chat</Button>
              ) : (
                <div className="flex-row w-full">
                  {replyToMessage ? (
                    <div className="w-full lg:w-full block bg-blue-100 rounded-t-lg pb-2">
                      <div className="flex justify-end pt-0.5 pr-2">
                        <X
                          size={16}
                          onClick={() => setReplyToMessage(null)}
                          className="cursor-pointer"
                        />
                      </div>
                      <div className="flex flex-row pr-2 bg-blue-50">
                        <div className="border-l-4 border-r-2 border-orange-400 mr-3" />
                        <div className="flex flex-col">
                          <span className="font-bold mr-1 text-slate-500">
                            {replyToMessage.username}
                          </span>
                          <div className="flex text-slate-500">
                            {replyToMessage.message?.length > 20
                              ? replyToMessage.message?.substring(0, 20) +
                                " ..."
                              : replyToMessage.message}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <Input
                    onChange={handleChange}
                    ref={chatRef}
                    value={
                      isChatConnected() ? message : "Waiting to connect..."
                    }
                    maxLength={500}
                    onKeyDown={handleKeyDown}
                    name="message"
                    disabled={!isChatConnected()}
                    placeholder={
                      isChatConnected()
                        ? "Say something"
                        : "Waiting to connect..."
                    }
                    className="w-full block p-2 mr-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {/* {isChatConnected() && moderator && (
                  <div className="w-[50px]">
                    <Popover>
                      <PopoverTrigger asChild>
                        <PlusCircle
                          size={32}
                          color="grey"
                          className="cursor-pointer"
                        />
                      </PopoverTrigger>
                      <PopoverContent
                        side="top"
                        className="w-full p-2 relative right-2.5"
                      >
                        <div className="grid gap-2 grid-cols-4 items-center justify-between">
                          <div className="p-3">
                            <PlusCircle />
                          </div>
                          <div className="p-3">
                            <Rocket />
                          </div>
                          <div className="p-3">
                            <ScanEye />
                          </div>
                          <div className="p-3">
                            <FileScan />
                          </div>
                          <div className="p-3">
                            <Dumbbell />
                          </div>
                          <div className="p-3">
                            <Camera />
                          </div>
                          <div className="p-3">
                            <Eclipse />
                          </div>
                          <div className="p-3">
                            <Smile />
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                )} */}
                </div>
              )}
              {isChatConnected() && !moderator && (
                //   mode === "HYBRID" &&
                //   !stageJoined &&
                <Tooltip content={handRaised ? "Lower Hand" : "Raise Hand"}>
                  <div className="w-[50px] relative flex">
                    <Hand
                      size={28}
                      // color={handRaised ? "green" : "grey"}
                      // fill={handRaised ? "green" : "transparent"}
                      strokeOpacity={0.8}
                      className="cursor-pointer"
                      onClick={() =>
                        handRaised
                          ? lowerHandToJoinStage(username)
                          : raiseHandToJoinStage(username)
                      }
                    />
                    {handRaised ? (
                      <span class="-top-1 left-5 absolute bg-red-500 rounded-full">
                        <ArrowDown
                          color="#fff"
                          strokeWidth={1.5}
                          size={14}
                          absoluteStrokeWidth
                        />
                      </span>
                    ) : (
                      <span class="-top-1 left-5 absolute bg-green-500 rounded-full">
                        <ArrowUp
                          color="#fff"
                          strokeWidth={1.5}
                          size={14}
                          absoluteStrokeWidth
                        />
                      </span>
                    )}
                  </div>
                </Tooltip>
              )}
            </div>
            {/* {isChatConnected() && (
                  <StickerPicker handleStickerSend={handleStickerSend} />
                )}
                {isChatConnected() && (
                  <RaiseHand
                    isRaised={handRaised}
                    handleRaiseHandSend={handleRaiseHandSend}
                  />
                )} */}
          </div>
        </ScrollArea>
      </>
    );
  }
);
export default Chat;
