import React, { useEffect, useState } from "react";
import {
  HMSChangeTrackStateRequest,
  HMSNotificationTypes,
  useHMSActions,
  useHMSNotifications,
} from "@100mslive/react-sdk";
import { MicOnIcon } from "@100mslive/react-icons";
// @ts-ignore: No implicit Any
import { RequestDialog } from "../../primitives/DialogContent";

export const TrackUnmuteModal = () => {
  const hmsActions = useHMSActions();
  const notification = useHMSNotifications([
    HMSNotificationTypes.CHANGE_TRACK_STATE_REQUEST,
    HMSNotificationTypes.ROOM_ENDED,
    HMSNotificationTypes.REMOVED_FROM_ROOM,
  ]);
  const [muteNotification, setMuteNotification] =
    useState<HMSChangeTrackStateRequest | null>(null);

  useEffect(() => {
    switch (notification?.type) {
      case HMSNotificationTypes.REMOVED_FROM_ROOM:
      case HMSNotificationTypes.ROOM_ENDED:
        setMuteNotification(null);
        break;
      case HMSNotificationTypes.CHANGE_TRACK_STATE_REQUEST:
        if (notification?.data.enabled) {
          setMuteNotification(notification.data);
        }
        break;
      default:
        return;
    }
  }, [notification]);

  if (!muteNotification) {
    return null;
  }

  const { requestedBy: peer, track, enabled } = muteNotification;

  const getDialogTitle = () => {
    if (track?.type === "video") {
      return `Turn on your camera`;
    } else {
      return `Unmute your microphone`;
    }
  };

  const getDialogBody = () => {
    if (track?.type === "video") {
      return `${peer?.name} is requesting you to turn on your camera`;
    } else {
      return `${peer?.name} is requesting you to unmute your microphone`;
    }
  };

  return (
    <RequestDialog
      title={getDialogTitle()}
      onOpenChange={(value: boolean) => !value && setMuteNotification(null)}
      body={getDialogBody()}
      onAction={() => {
        hmsActions.setEnabledTrack(track.id, enabled);
        setMuteNotification(null);
      }}
      Icon={MicOnIcon}
    />
  );
};
