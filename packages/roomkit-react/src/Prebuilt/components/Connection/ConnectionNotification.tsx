import React from "react";
import {
  HMSPeerType,
  selectConnectionQualityByPeerID,
  selectLocalPeerID,
  selectPeerTypeByID,
  useHMSStore,
} from "@100mslive/react-sdk";
import FixedNotificationContainer from "../Notifications/FixedNotificationContainer";

const ConnectionNotification = () => {
  const message = "Your network connection is weak.";
  const peerId = useHMSStore(selectLocalPeerID);
  const peerType = useHMSStore(selectPeerTypeByID(peerId));

  const downlinkQuality = useHMSStore(
    selectConnectionQualityByPeerID(peerId)
  )?.downlinkQuality;

  if (
    downlinkQuality === -1 ||
    downlinkQuality === undefined ||
    peerType === HMSPeerType.SIP
  ) {
    return null;
  }

  if (downlinkQuality < 3) {
    return <FixedNotificationContainer>{message}</FixedNotificationContainer>;
  }
  return null;
};

export default ConnectionNotification;
