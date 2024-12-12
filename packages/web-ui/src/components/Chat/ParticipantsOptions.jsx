import { useContext, useEffect, useRef, useState } from "react";
import TooltipComponent from "../Tooltip";
import { EllipsisVertical } from "lucide-react";
import { sendChatEvent } from "../../api/channel";
import { FEATURES, hasAccess } from "../../constants";
import { UserSettingsContext } from "../../providers/UserSettingsContext";

const ParticipantOptions = ({
  handleRemoveStageUser,
  userId,
  setOpen,
  handlePrivateMessage,
  stageInfo,
}) => {
  const menuRef = useRef(null);
  const { role } = useContext(UserSettingsContext);
  const [optionsOpen, setOptionsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOptionsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleMenu = () => {
    setOptionsOpen(!optionsOpen);
  };

  const sendUnmuteRequest = async () => {
    const eventPayload = {
      roomId: stageInfo.current.chatRoomArn,
      eventName: "app:SHOW_NOTIFICATION",
      eventAttributes: {
        userId,
        notificationTitle: "Request to unmute",
        description: "Host has requested you to turn on your mic",
      },
    };
    await sendChatEvent(eventPayload);
  };

  return (
    <>
      <span className="cursor-pointer" onClick={() => toggleMenu()}>
        <TooltipComponent content={"Options"}>
          <EllipsisVertical className="text-inherit h-4 w-4 mx-2" />
        </TooltipComponent>
      </span>
      {optionsOpen && (
        <div className="relative inline-block text-left" ref={menuRef}>
          <div className="fixed right-0 mt-2 bg-white rounded-md overflow-hidden shadow-lg z-10">
            <div className="py-1">
              <div
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer focus:outline-none"
                onClick={() => {
                  setOptionsOpen(false);
                  setOpen(false);
                  handlePrivateMessage(userId);
                }}
              >
                Message Privately
              </div>
              <div
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer focus:outline-none"
                onClick={() => {
                  setOptionsOpen(false);
                  setOpen(false);
                  sendUnmuteRequest();
                }}
              >
                Request to Unmute
              </div>
              {hasAccess(role, "features", FEATURES.REMOVE_PARTICIPANT) && (
                <div
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer focus:outline-none"
                  onClick={() => {
                    setOptionsOpen(false);
                    setOpen(false);
                    handleRemoveStageUser(userId);
                  }}
                >
                  Remove User
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ParticipantOptions;
