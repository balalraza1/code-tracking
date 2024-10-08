import { useEffect, useState } from "react";
import {
  HMSNotificationTypes,
  selectPeersByRole,
  useHMSNotifications,
  useHMSStore,
} from "@100mslive/react-sdk";
// @ts-ignore: No implicit Any
import {
  TEACHER_ROLE_NAME,
  TRAINER_ALREADY_PRESENT,
  TRAINER_JOINED_ROOM,
  TRAINER_LEFT_ROOM,
  TRAINER_NOT_PRESENT,
} from "../../common/constants";

const notificationTypes = [
  HMSNotificationTypes.PEER_JOINED,
  HMSNotificationTypes.PEER_LEFT,
];

type TrainerEvents =
  | typeof TRAINER_JOINED_ROOM
  | typeof TRAINER_LEFT_ROOM
  | typeof TRAINER_NOT_PRESENT
  | typeof TRAINER_ALREADY_PRESENT;

export const useTrainerEvents = () => {
  const trainer = useHMSStore(selectPeersByRole(TEACHER_ROLE_NAME))[0];
  const [trainerEvent, setTrainerEvent] = useState<TrainerEvents | undefined>(
    () => (!trainer?.id ? TRAINER_NOT_PRESENT : TRAINER_ALREADY_PRESENT)
  );
  const notification = useHMSNotifications(notificationTypes);

  useEffect(() => {
    if (!trainer?.id) {
      setTrainerEvent(TRAINER_NOT_PRESENT);
      return;
    }

    // Set event based on notification type and roleName
    switch (notification?.type) {
      case HMSNotificationTypes.PEER_LEFT:
        if (notification.data.roleName === TEACHER_ROLE_NAME) {
          setTrainerEvent(TRAINER_LEFT_ROOM);
        }
        break;
      case HMSNotificationTypes.PEER_JOINED:
        if (notification.data.roleName === TEACHER_ROLE_NAME) {
          setTrainerEvent(TRAINER_JOINED_ROOM);
        }
        break;
      default:
        // Set trainer as already present if no relevant notification is found
        setTrainerEvent(TRAINER_ALREADY_PRESENT);
        break;
    }
  }, [notification, trainer]);

  return trainerEvent;
};
